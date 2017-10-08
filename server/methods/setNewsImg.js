Meteor.methods({
	setNewsImg(id, fileId) {

		check(id, String);
		check(fileId, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setNewsImg' });
		}
		
		const currentApplication = NewsList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setNewsImg' });
		}

		var curIm = currentApplication.img;
		if(curIm) Images.remove(curIm.slice(18));
		
		NewsList.update(id, {
			$set: {
				img: '/cfs/files/images/' + fileId
			}
		});
		return fileId;
	}
});
