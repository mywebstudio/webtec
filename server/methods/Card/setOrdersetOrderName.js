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

Meteor.methods({
	setOrderEmail(orderId, val) {

		const Email = Match.Where((x) => {
			check(x, String);
			return (x.indexOf('@') != -1 && x.indexOf('@.') == -1 && x.indexOf('.@') == -1 && x[0] != '@' && x[0] != '.' && x[x.length - 1] != '.' && x[x.length - 1] != '@' && x.length > 4 && x.indexOf('.') != -1);
		});
		check(val, Email);

		check(orderId, String);

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderEmail' });
		}

		OrdersList.update(orderId, {
			$set: {
				email: val
			}
		});
		return true;
	}
});

Meteor.methods({
	setOrderUserName(orderId, val) {

		check(orderId, String); 
		check(val, String);
		
		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderUserName' });
		}

		OrdersList.update(orderId, {
			$set: {
				username: val
			}
		});

		return true;
		
	}
});

Meteor.methods({
	settOrderUserAdress(orderId, val) {

		check(orderId, String); 
		check(val, String);

		
		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'settOrderUserAdress' });
		}

		
		OrdersList.update(orderId, {
			$set: {
				useraddress: val
			}
		});

		return true;
		
	}
});
