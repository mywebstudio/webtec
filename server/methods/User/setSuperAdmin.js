Meteor.methods({
	setSuperAdmin() {

		return Meteor.users.update(this.userId, {
			$set: {super: true}
		});
	}
});