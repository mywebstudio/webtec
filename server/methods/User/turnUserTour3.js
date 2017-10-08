Meteor.methods({
	turnUserTour3() {

		var user = Meteor.users.findOne(this.userId);

		var tour = true;
		if(user.tour3) tour = false;
		if(!user.tour3) tour = true;

		return Meteor.users.update(this.userId, {
			$set: {tour3: tour}
		});
	}
});
