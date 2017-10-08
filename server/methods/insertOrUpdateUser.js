Meteor.methods({
	insertOrUpdateUser(userData) {

		check(userData, Object);


// insert user
		const createUser = {
			username: userData.username,
			password: userData.password,
			email: userData.email,
			verified: true
		};

		const _id = Accounts.createUser(createUser);
		if(_id) {

			// Meteor.call('setManager', _id, this.userId);

			return _id
		}

	}
});
