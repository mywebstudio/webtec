Meteor.methods({
	setFilterDescription(id, value) {

		check(value, String);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterDescription' });
		}

		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterDescription' });
		}


		return FiltersList.update(id, {
			$set: {description: value}
		});
	}
});
