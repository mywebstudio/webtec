Meteor.methods({
	updateFilter(applicationId, application) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateFilter' });
		// }
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'updateFilter' });
		}
		if (!_.isBoolean(application.active)) {
			throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', { method: 'updateFilter' });
		}
		const currentApplication = FiltersList.findOne(applicationId);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'updateFilter' });
		}
		FiltersList.update(applicationId, {
			$set: {
				name: application.name,
				active: application.active,
				category: application.category,
				prop: application.prop,
				alias: slugify(application.name),
				_updatedAt: new Date
			}
		});
		return FiltersList.findOne(applicationId);
	}
});
