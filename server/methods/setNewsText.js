Meteor.methods({
	setNewsText(id, value) {

		check(id, String);
		check(value, String);
		
		const currentApplication = NewsList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setNewsText' });
		}
		
		NewsList.update(id, {
			$set: {
				text: value		
			}
		});
		return value;
	}
});
