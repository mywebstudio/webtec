Meteor.methods({
	setItemNacenka(id, value) {

		check(id, String);
		check(value, Number);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemNacenka' });
		}
		
		Items.update(id, {
			$set: {
				nacenka: value
			}
		});
		return value;
	}
});
