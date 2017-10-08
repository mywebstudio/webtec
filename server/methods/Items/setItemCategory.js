Meteor.methods({
	setItemCategory(id, value) {

		check(id, String);
		check(value, String);
		
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemCategory' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		
		Items.update(id, {
			$set: {
				category: value		
			}
		});
		return value;
	}
});
