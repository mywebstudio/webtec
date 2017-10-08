Meteor.methods({
	setOrderItemDuble(itemId, orderId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setOrderItemDuble' });
		// }

		check(itemId, String);
		check(orderId, String);
		
		if (!itemId || itemId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemDuble' });
		}

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemDuble' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Invalid order', { method: 'setOrderItemDuble' });
		}

		if(currentApplication.user == this.userId || Meteor.user.roles == 'admin' ) {
			OrdersList.update(orderId, {
				$set: {
					_updatedAt: new Date
				}
			});

			OrdersList.update(orderId, {
				$push: {
					items: itemId
				}
			});			
			
			return Meteor.call('updateOrderCount', orderId);

		}
		else {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setOrderItemDuble' });
		}
		
	}
});
