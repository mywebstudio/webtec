Meteor.methods({
	turnUserTour2() {

		var user = Meteor.users.findOne(this.userId);

		var tour = true;
		if(user.tour2) tour = false;
		if(!user.tour2) tour = true;

		return Meteor.users.update(this.userId, {
			$set: {tour2: tour}
		});
	}
});
