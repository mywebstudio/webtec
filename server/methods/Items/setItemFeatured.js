Meteor.methods({
	setItemFeatured(id, value) {

		check(id, String);
		check(value, Boolean);
		
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemFeatured' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		
		Items.update(id, {
			$set: {
				featured: value
			}
		});
		return '1';
	}
});
