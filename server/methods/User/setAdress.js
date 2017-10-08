Meteor.methods({
	setAdress(id, adress) {


		var currentUser = Meteor.users.findOne(this.userId);
		
		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setAdress' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setAdress' });
		}

		return Meteor.users.update(id, {
			$set: {adress: adress}
		});
	}
});
