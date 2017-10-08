Meteor.methods({
	addSection(application) {

		check(application.name, String);
		check(application.sort, Number);

		application._createdAt = new Date;
		application.redirectUri = slugify(application.name);
		application._id = Sections.insert(application);

		return application;
	}
});
