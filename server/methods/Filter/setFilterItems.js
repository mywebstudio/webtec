Meteor.methods({
	setFilterItems(id, value) {

		check(id, String);
		check(value, Array);
		
		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterItems' });
		}
		
		FiltersList.update(id, {
			$set: {
				items: value		
			}
		});
		return value;
	}
});
