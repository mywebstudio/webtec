Meteor.methods({
	setItemMeter(id, value) {

		check(id, String);
		check(value, String);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemMeter' });
		}
		
		Items.update(id, {
			$set: {
				meter: value
			}
		});
		return value;
	}
});
