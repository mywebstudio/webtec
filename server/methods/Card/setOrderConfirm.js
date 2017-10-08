Meteor.methods({
	setOrderConfirm(orderId) {

		check(orderId, String);

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemDelete' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Заказ закрыт', { method: 'setOrderItemDelete' });
		}
		
		
		OrdersList.update(orderId, {
			$set: {
				confirm: true
			}
		});
		
	}
});
