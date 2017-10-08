Meteor.methods({
	updateOrderClose(orderId, html) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateOrderClose' });
		// }
		check(orderId, String);

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-or-closed-order', 'Invalid order', { method: 'updateOrderClose' });
		}



		if(currentApplication.user == this.userId || Meteor.user.roles == 'admin' ) {

			OrdersList.update(orderId, {
				$set: {
					_updatedAt: new Date,
					active: false
				}
			});

			const user = Meteor.users.findOne(this.userId);
			const manager = Meteor.users.findOne(user.manager);

			
			Email.send({
				to: user.emails[0].address,
				from: RocketChat.settings.get('From_Email'),
				subject: 'Новая заявка с сайта ТЕХНОСТИЛЬ ОПТ',
				html: html
			});
			
			Email.send({
				to: manager.emails[0].address,
				from: RocketChat.settings.get('From_Email'),
				subject: 'Новая заявка с сайта ТЕХНОСТИЛЬ ОПТ',
				html: html
			});

			return orderId;

		}
		else {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateOrderClose' });
		}

		// Если у пользователя нет открытых заказов то создаём новый оставляем открытым


		
	}
});
