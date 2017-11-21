Meteor.methods({
	setOrderSpec(orderId, val) {

		check(orderId, String); 
		check(val, String);



		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderSpec' });
		}

		
		OrdersList.update(orderId, {
			$set: {
				spec: val
			}
		});

		return true;
		
	}
});
