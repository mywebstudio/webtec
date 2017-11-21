Meteor.methods({
	setOrderName(orderId, val) {

		check(orderId, String); 
		check(val, String);



		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderName' });
		}

		
		OrdersList.update(orderId, {
			$set: {
				name: val
			}
		});

		return true;
		
	}
});
