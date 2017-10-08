Meteor.methods({
	setItemRelated(id, value) {

		check(id, String);
		check(value, Array);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemRelated' });
		}
		
		Items.update(id, {
			$set: {
				related: value		
			}
		});
		return value;
	}
});
