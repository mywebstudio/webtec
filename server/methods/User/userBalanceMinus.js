Meteor.methods({
	userBalanceMinus(id, value) {
		
		check(value, Number);
		check(id, String);

		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'userBalanceMinus' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (currentUser.roles != 'admin' && currentUser._id != id) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'userBalanceMinus' });
		}

		var balance = currentUser.balance - value;

		Meteor.users.update(id, {
			$set: {balance: balance}
		});

		return value
	}
});