Meteor.methods({
	setCatalogActive(id, value) {

		check(value, Boolean);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setCatalogActive' });
		}

		const currentApplication = Sections.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setCatalogActive' });
		}

		return Sections.update(id, {
			$set: {active: value}
		});
	}
});
