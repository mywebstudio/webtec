Meteor.methods({
	setAdminStatus(id) {

		var currentUser = Meteor.users.findOne(this.userId);
		console.log(this.userId);

		if (!Meteor.users.findOne(id)) {
			// throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setAdminStatus' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setAdminStatus' });
		}

		Meteor.users.update(id, {
			$set: {roles: 'admin', manager: false}
		});
	}
});
