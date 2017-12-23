Meteor.methods({
	setBalance(id, value) {
		
		check(value, Number);
		check(id, String);

		var currentUser = Meteor.users.findOne(id);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setBalance' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		// if (currentUser.roles != 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setBalance' });
		// }

		var balance = Number(currentUser.balance);

		return Meteor.users.update(id, {
			$set: {balance: balance + value }
		});
	}
});