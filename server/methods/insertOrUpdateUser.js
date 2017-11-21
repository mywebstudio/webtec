Meteor.methods({
	insertOrUpdateUser(userData) {

		check(userData, Object);


// insert user
		
		userData.verified = true;

		const id = Accounts.createUser(userData);
		if(id) {

			// Meteor.call('setManager', _id, this.userId);

			return id
		}

	}
});
