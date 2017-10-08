Meteor.methods({
	addOrder(itemId, col) {

		check(itemId, String);
		
		if (Meteor.user.roles == 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Вы являетесь менеджером а не клиентом', { method: 'addOrder' });
		}

		if (!itemId || itemId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'addOrder' });
		}
		
		const currentApplication = OrdersList.findOne({user: this.userId, active: true});
		const user = Meteor.users.findOne(this.userId);

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
			application.manager = user.manager;
			application.active = true;
			application.confirm = true;
			application.items = [itemId];

			application._id = OrdersList.insert(application);
			return application;
		} 
		// Если у пользователя уже есть открытый заказ то добавляем к нему новый товар

		else {

			OrdersList.update(currentApplication._id, {
				$set: {			
					_updatedAt: new Date
				}
			});

			//проверяем чтобы не было дублей
			var itemarray = currentApplication.items;

			if(itemarray.indexOf(itemId) == -1)

				//если нет дублей - добаляем
				OrdersList.update(currentApplication._id, {
					$push: {
						items: itemId
					}
				});

			//если есть дубль - убираем его
			else
				OrdersList.update(currentApplication._id, {
					$set: {
						items: itemarray.splice(itemarray.indexOf(itemId),1)
					}
				});
			

			return currentApplication;
		}


	}
});
