import { Random } from 'meteor/random'

Meteor.methods({
	replaceOrderItem(orderId, itemId, input) {

		check(orderId, String);
		check(itemId, String);
		check(input, String);
		

		if (!orderId || orderId === '') {
			throw new Meteor.Error('error-invalid-itemId', 'Invalid itemId', { method: 'replaceOrderItem' });
		}

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication || currentApplication.active == false) {
			throw new Meteor.Error('error-invalid-order', 'Заказ закрыт', { method: 'replaceOrderItem' });
		}
		var oldItem = Items.findOne(itemId);
		
		var newItem = oldItem;
		newItem.name = oldItem.name +' - '+ Meteor.user().username;
		newItem.teh = input;
		newItem._id = Random.id();
		newItem.active = false;
		newItem.moder = false;
		newItem.user = this.userId;
		newItem.price = 1;
		newItem.order = orderId;
		Items.insert(newItem);

		var newitems = [];
		for(var i=0;i<currentApplication.items.length; i++){
			if(currentApplication.items[i] == itemId)
				newitems[i] = newItem._id;
			else newitems[i] = currentApplication.items[i];

		}

		OrdersList.update(orderId, {
			$set: {
				confirm: false
			}
		});

		Meteor.call('sendNewItem', newItem._id);

		
		return Meteor.call('setCurOrder', newitems);
		
	}
});
