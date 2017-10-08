Meteor.methods({
	setCatalogDescription(id, name) {

		check(name, String);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setCatalogDescription' });
		}

		const currentApplication = Sections.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setCatalogDescription' });
		}

		return Sections.update(id, {
			$set: {description: name}
		});
	}
});
 