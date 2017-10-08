Meteor.methods({
	setFilterActive(id, adress) {

		check(adress, Boolean);
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterActive' });
		}

		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterActive' });
		}

		return FiltersList.update(id, {
			$set: {active: adress}
		});
	}
});
