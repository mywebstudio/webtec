Meteor.methods({
	imagesOldRemove() {
		
		var id;
		var i;
		var fileId;


		var items = Items.find().fetch();
		console.log(items.length);

		for( i=0; i < items.length; i++) {
			
			id = items[i]._id;

			fileId = Items.update(id, {
				$unset: {galleryImg: [], mainImg: '', mainImgMini: ''}
			});

			console.log(i);
			console.log(id);

		}
	}
});
