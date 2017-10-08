Meteor.methods({
	updateCatalogItem(applicationId, application) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateCatalogItem' });
		// }
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'updateCatalogItem' });
		}
		if (!_.isBoolean(application.active)) {
			throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', { method: 'updateCatalogItem' });
		}
		const currentApplication = Items.findOne(applicationId);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'updateCatalogItem' });
		}
		Items.update(applicationId, {
			$set: {
				name: application.name,
				active: application.active,
				mainImg: application.mainImg,
				price: application.price,
				quant: application.quant,
				galleryImg: application.galleryImg,
				mainImgMini: application.mainImgMini,
				sort: application.sort,
				description: application.description,
				color: application.color,
				brand: application.brand,
				material: application.material,
				category: application.category,
				articul: application.articul,
				redirectUri: slugify(application.name),
				_updatedAt: new Date
			}
		});
		return Items.findOne(applicationId);
	}
});
