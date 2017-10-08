Meteor.methods({
	setCatalogOrder(id, sort) {

		check(sort, Number);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setCatalogOrder' });
		}

		const currentApplication = Sections.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setCatalogOrder' });
		}

		return Sections.update(id, {
			$set: {sort: sort}
		});
	}
});
