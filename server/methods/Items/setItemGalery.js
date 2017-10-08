Meteor.methods({
	setItemGalery(id, fileId) {

		check(id, String);
		check(fileId, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemMainImg' });
		}


		Items.update(id, {
			$addToSet: {
				gallery: '/cfs/files/gallery/' + fileId
			}
		});
		return fileId;
	}
});
