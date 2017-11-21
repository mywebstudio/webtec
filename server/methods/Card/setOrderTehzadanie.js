Meteor.methods({
	setOrderTehzadanie(orderId, val) {

		check(orderId, String); 
		check(val, String);



		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderTehzadanie' });
		}

		
		OrdersList.update(orderId, {
			$set: {
				tehzadanie: val
			}
		});

		return true;
		
	}
});
