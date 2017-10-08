Meteor.methods({
	setActive(id, adress) {

		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setActive' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setActive' });
		}

		return Meteor.users.update(id, {
			$set: {active: adress}
		});
	}
});
