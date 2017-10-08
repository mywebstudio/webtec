Meteor.methods({
	setINewsFeatured(id, value) {

		check(id, String);
		check(value, Boolean);
		
		const currentApplication = NewsList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setINewsFeatured' });
		}
		
		NewsList.update(id, {
			$set: {
				active: value		
			}
		});
		return value;
	}
});
