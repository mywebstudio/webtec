Meteor.methods({
	setRol(id, tel) {

		check(tel, String);

		check(id, String);

		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setActive' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setActive' });
		}
		if(currentUser.roles == 'admin' && user._id == currentUser._id ) {

			return 'Вы не можете разжаловать сами себя из администраторов'

		} else {
			return Meteor.users.update(id, {
				$set: {roles: tel}
			});
		}
	}
});