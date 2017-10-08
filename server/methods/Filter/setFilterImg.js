Meteor.methods({
	setFilterImg(id, fileId) {

		check(id, String);
		check(fileId, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterImg' });
		}
		
		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterImg' });
		}

		var curIm = currentApplication.img;
		if(curIm) Images.remove(curIm.slice(18));
		
		FiltersList.update(id, {
			$set: {
				img: '/cfs/files/images/' + fileId
			}
		});
		return fileId;
	}
});
