Meteor.methods({
	setItemHide(id, value) {

		check(id, String);
		check(value, Boolean);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemHide' });
		}
		
		Items.update(id, {
			$set: {
				hide: value
			}
		});
		return '1';
	}
});
