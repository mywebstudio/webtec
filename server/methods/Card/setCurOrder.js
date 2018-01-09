Meteor.methods({
	setCurOrder(items) {

		check(items, Array);

		// if (Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Вы являетесь менеджером а не клиентом', { method: 'addOrder' });
		// }
		
		const currentApplication = OrdersList.findOne({user: this.userId, active: true});
		const user = Meteor.users.findOne(this.userId);

		var fitem = {};
		var fitem = Items.findOne(items[0]);
		

		// Если у пользователя нет открытых заказов то создаём новый оставляем открытым
		
		if (currentApplication == null) {
			
			// Подсчитываем общее количество заказов
			var application = {};

			const kol = OrdersList.find().fetch();
			if(kol.length > 0)
				application.number = kol.length + 1;
			else
				application.number = 1;
			
			application._createdAt = new Date;
			application.user = this.userId;
			application.active = true;
			application.items = items;
			application.confirm = true;
			
			if(fitem && fitem.category == 'besplatno') application.free = true;

			application._id = OrdersList.insert(application);

			//Пересчитываем сумму
			Meteor.call('updateOrderCount', application._id);
			
			return application;
		} 
		// Если у пользователя уже есть открытый заказ то добавляем к нему новый товар

		else {

			OrdersList.update(currentApplication._id, {
				$set: {			
					_updatedAt: new Date
				}
			});


			OrdersList.update(currentApplication._id, {
				$set: {
					items: items
				}
			});

			//Пересчитываем сумму
			Meteor.call('updateOrderCount', currentApplication._id);

			return currentApplication;
		}
	}
});
