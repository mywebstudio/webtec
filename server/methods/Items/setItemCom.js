Meteor.methods({
	setItemCom(id, value) {

		check(id, String);
		check(value, String);
		
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemCom' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setItemCom' });
		}
		
		Items.update(id, {
			$set: {
				com: value		
			}
		});
		return value;
	}
});
