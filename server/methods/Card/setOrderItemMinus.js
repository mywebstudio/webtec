Meteor.methods({
	setOrderItemMinus(itemId, orderId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setOrderItemMinus' });
		// }

		check(itemId, String);
		check(orderId, String);
		
		if (!itemId || itemId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemMinus' });
		}

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'setOrderItemMinus' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Invalid order', { method: 'setOrderItemMinus' });
		}

		if(currentApplication.user == this.userId || Meteor.user.roles == 'admin' ) {
			OrdersList.update(orderId, {
				$set: {
					_updatedAt: new Date
				}
			});


			var items = currentApplication.items;
			var i = 0;
			var flag = false;
			var newitems = [];
			while( i <= items.length){
				if(items[i] != itemId || flag == true) newitems.push(items[i]);
				if(items[i] == itemId ) flag = true;
				i++;
			}
			console.log(newitems);

			OrdersList.update(orderId, {
				$set: {
					items: newitems
				}
			});
			
			return Meteor.call('updateOrderCount', orderId);

		}
		else {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setOrderItemMinus' });
		}
		
	}
});
