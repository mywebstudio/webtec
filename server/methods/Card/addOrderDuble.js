Meteor.methods({
	addOrderDuble(orderId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'addOrderDuble' });
		// }
		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-orderId', 'Invalid orderId', { method: 'addOrderDuble' });
		}
		
		const currentApplication = OrdersList.findOne(orderId);
		const histApplication = OrdersList.findOne({user: currentApplication.user, active: true});

		// Если у пользователя нет открытых заказов то создаём новый оставляем открытым

		if(histApplication == null) {

			if (currentApplication.active == false) {

				const kol = OrdersList.findOne({},{sort: {count: -1}});

				var application = currentApplication;
				application._createdAt = new Date;
				application.active = true;
				application.count = kol.count + 1;
				delete application.payed;
				delete application._id;

				application._id = OrdersList.insert(application);
				return application;
			}
			else throw new Meteor.Error('error-invalid-orderId', 'Заказ не закрыт', {method: 'addOrderDuble'});

		}

		// Если у пользователя уже есть открытый заказ то добавляем к нему новый товар

		else {
			OrdersList.update(histApplication._id, {
				$set: {
					_updatedAt: new Date
				}
			});
			OrdersList.update(histApplication._id, {
				$push: {
					items: {
						$each: currentApplication.items
					}
				}
			});
			return histApplication;
		}
	}
});
