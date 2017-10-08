Meteor.methods({
	setFilterName(id, name) {

		check(name, String);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterName' });
		}

		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterName' });
		}

		return FiltersList.update(id, {
			$set: {name: name}
		});
	}
});
