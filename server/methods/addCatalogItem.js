Meteor.methods({
	addCatalogItem(application) {

		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'addCatalogItem' });
		}
		if (!_.isBoolean(application.active)) {
			throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', { method: 'addCatalogItem' });
		}

		application._createdAt = new Date;
		application.alias = slugify(application.name);

		application._id = Items.insert(application);
		return application;
	}
});
