Meteor.methods({
	setItemName(id, value) {

		check(id, String);
		check(value, String);
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		if(id == 'new'){
			application._createdAt = new Date;
			application.redirectUri = slugify(value);
			application.name = value;
			application.active = false;
			application._id = Items.insert(application);
			return application;
		}
		else {
			const currentApplication = Items.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setItemName'});
			}

			Items.update(id, {
				$set: {
					name: value,
					redirectUri: slugify(value)
				}
			});
			return value;
		}
	}
});
