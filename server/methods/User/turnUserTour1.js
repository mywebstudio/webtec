Meteor.methods({
	turnUserTour1() {

		var user = Meteor.users.findOne(this.userId);

		var tour = true;
		if(user.tour1) tour = false;
		if(!user.tour1) tour = true;

		return Meteor.users.update(this.userId, {
			$set: {tour1: tour}
		});
	}
});
