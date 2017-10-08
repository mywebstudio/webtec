Meteor.methods({
	setEmail(id, email) {

		check (id, String);
		check (email, String);
		
		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setActive' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setActive' });
		}


		var oldemail = user.emails;
		if(user.emails[0]){
			Accounts.removeEmail(id, user.emails[0].address)
		}
		var x = Accounts.addEmail(id, email);
		// Accounts.sendVerificationEmail(id);
		return x;
	}
});