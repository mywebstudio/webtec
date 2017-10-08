Meteor.methods({
	updateOrderPayed(orderId, html) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateOrderPayed' });
		// }
		check(orderId, String); 
		
		
		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'updateOrderPayed' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Invalid order', { method: 'updateOrderPayed' });
		} 
		
		if(currentApplication.user != this.userId && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-invalid-user', 'Недостаточно полномочий', { method: 'updateOrderPayed' });
		}
		
		// Если у пользователя нет открытых заказов то создаём новый оставляем открытым

		
			OrdersList.update(orderId, {
				$set: {			
					_payedAt: new Date,
					payed: true,
					active: false
				}
			});


		const user = Meteor.users.findOne(currentApplication.user);
		const manager = Meteor.users.findOne(user.manager);


		// Email.send({
		// 	to: user.emails[0].address,
		// 	from: 'stuurgurs@yandex.ru',
		// 	subject: 'Новая заявка с сайта ТЕХНОСТИЛЬ ОПТ',
		// 	html: html
		// });
        //
		// Email.send({
		// 	to: manager.emails[0].address,
		// 	from: 'stuurgurs@yandex.ru',
		// 	subject: 'Новая заявка с сайта ТЕХНОСТИЛЬ ОПТ',
		// 	html: html
		// });


		return orderId;
		
	}
});
