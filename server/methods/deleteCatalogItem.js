Meteor.methods({
	deleteCatalogItem(applicationId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'deleteCatalogItem' });
		// }
		const application = Items.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'deleteCatalogItem' });
		}

		var curIm = application.img;
		if(curIm) Images.remove(curIm.slice(18));

		var gal = application.gallery;
		if(gal && gal.length) {
			for (var y = 0; y < gal.length; y++) {
				if (gal[y])
					Gallery.remove(gal[y].slice(19));
			}
		}

		Items.remove({ _id: applicationId });
		return true;
	}
});
