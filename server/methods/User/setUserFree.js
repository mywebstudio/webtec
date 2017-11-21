Meteor.methods({
	setUserFree() {


		var currentUser = Meteor.users.findOne(this.userId);


		return Meteor.users.update(this.userId, {
			$set: {free: true}
		});
	}
});