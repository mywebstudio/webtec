Meteor.methods({
	addFilter(application) {
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'addFilter' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}


		application._createdAt = new Date;
		application.alias = slugify(application.name);

		application._id = FiltersList.insert(application);
		return application;
	}
});
