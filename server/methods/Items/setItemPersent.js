Meteor.methods({
	setItemPersent(id, value) {

		check(id, String);
		check(value, Boolean);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemPersent' });
		}
		
		Items.update(id, {
			$set: {
				percent: value
			}
		});
		return '1';
	}
});
