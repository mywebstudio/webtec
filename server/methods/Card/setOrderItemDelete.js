Meteor.methods({
	setOrderItemDelete(itemId, orderId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setOrderItemDelete' });
		// }
		check(itemId, String);
		check(orderId, String);

		if (!itemId || itemId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemDelete' });
		}

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemDelete' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Заказ закрыт', { method: 'setOrderItemDelete' });
		}
		
		if(currentApplication.user == this.userId || Meteor.user.roles == 'admin') {
			
			OrdersList.update(orderId, {
				$set: {
					_updatedAt: new Date
				}
			});

			// var items = currentApplication.items;
			// var i = 0;
			// var newitems = [];
			// while( i <= items.length){
			// 	if(i != itemId) newitems.push(items[i]);
			// 	i++;
			// }

			OrdersList.update(orderId, {
				$pull: {
					items: itemId
				}
			});

			var item = Items.findOne(itemId);
			if(item.order == orderId)
				Items.remove(itemId);
			
			return Meteor.call('updateOrderCount', orderId);
			
		} 
		else {

			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setOrderItemDelete' });
		}
		
		
	}
});
