Meteor.methods({
	setItemImg(id, fileId) {

		check(id, String);
		check(fileId, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemMainImg' });
		}

		var curIm = currentApplication.img;
		if(curIm) Images.remove(curIm.slice(18));
		
		Items.update(id, {
			$set: {
				img: '/cfs/files/images/' + fileId
			}
		});
		return fileId;
	}
});
