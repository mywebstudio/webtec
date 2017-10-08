Meteor.methods({
	setItemMainImg(id, value, value2) {

		check(id, String);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemMainImg' });
		}
		
		Items.update(id, {
			$set: {
				mainImg: value,
				mainImgMini: value2
			}
		});
		return value;
	}
});
