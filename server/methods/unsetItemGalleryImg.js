Meteor.methods({
	unsetItemGalleryImg(id, key) {

		check(id, String);
		
		const currentApplication = Items.findOne(id);

		var curIm = currentApplication.gallery[key];
		var x = Gallery.remove(curIm.slice(19));


		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'unsetItemGalleryImg' });
		}
		if(currentApplication.gallery.length) {
			
			delete currentApplication.gallery[key];
		} 
		else
			currentApplication.gallery = [];


		
		Items.update(id, {
			$set: {
				gallery: currentApplication.gallery
			}
		});
		return key;
	}
});
