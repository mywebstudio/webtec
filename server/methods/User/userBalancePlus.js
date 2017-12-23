Meteor.methods({
	userBalancePlus(id, value) {
		
		check(value, Number);
		check(id, String);

		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'userBalancePlus' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (currentUser.roles != 'admin' && currentUser._id != id) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'userBalancePlus' });
		}

		var balance = currentUser.balance + value;

		Meteor.users.update(id, {
			$set: {balance: balance}
		});

		var pay = {};
		pay.count = 300;
		pay._createdAt = new Date();
		pay.user = user._id;
		pay.method = 'Бонус за быстрое оформление проекта';
		Pays.insert(pay);

		return value
	}
});