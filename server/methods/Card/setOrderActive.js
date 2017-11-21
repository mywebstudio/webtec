Meteor.methods({
	setOrderActive(orderId) {

		check(orderId, String);

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderActive' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Заказ отложен', { method: 'setOrderActive' });
		}
		
		var toggle = !currentApplication.active;
		
		OrdersList.update(orderId, {
			$set: {
				active: toggle
			}
		});
		
	}
});
