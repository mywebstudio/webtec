Meteor.methods({
	setItemTime(id, value) {

		check(id, String);
		

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemTime' });
		}
		
		Items.update(id, {
			$set: {
				time: value
			}
		});
		return value;
	}
});
