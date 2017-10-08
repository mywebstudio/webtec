Meteor.methods({
	setFilterShort(id, value) {

		check(value, String);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterShort' });
		}

		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterShort' });
		}


		return FiltersList.update(id, {
			$set: {short: value}
		});
	}
});
