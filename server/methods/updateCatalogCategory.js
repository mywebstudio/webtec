Meteor.methods({
	updateCatalogCategory(applicationId, application) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateCatalogCategory' });
		// }
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'updateCatalogCategory' });
		}
		
		if (!_.isBoolean(application.active)) {
			throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', { method: 'updateCatalogCategory' });
		}
		const currentApplication = Sections.findOne(applicationId);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Категория не найдена', { method: 'updateCatalogCategory' });
		}
		Sections.update(applicationId, {
			$set: {
				name: application.name,
				active: application.active,
				sort: application.sort
			}
		});
		return Sections.findOne(applicationId);
	}
});
