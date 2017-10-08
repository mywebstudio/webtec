Meteor.methods({
	setCatalogName(id, name) {

		check(name, String);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setCatalogName' });
		}

		const currentApplication = Sections.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setCatalogName' });
		}

		return Sections.update(id, {
			$set: {name: name}
		});
	}
});
