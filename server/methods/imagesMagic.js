Meteor.methods({
	imagesMagic() {
		Future = Npm.require('fibers/future');
		var newFile = new FS.File();
		var id;
		var i;
		var fileId;
		let fsFile = new FS.File();
		var one = Meteor.wrapAsync(fsFile.attachData);

		var images = Images.find().fetch();
		for( i=0; i < images.length; i++) {
			id = images[i]._id;
			Images.remove(id);
		}
		var gallery = Gallery.find().fetch();
		for( i=0; i < gallery.length; i++) {
			id = gallery[i]._id;
			Gallery.remove(id);
		}

		var items = Items.find().fetch();
		console.log(items.length);

		for( i=0; i < items.length; i++) {
			
			id = items[i]._id;

			Items.update(id, {
				$unset: {gallery: []}
			});

			console.log(i);
			console.log(id);
			if(items[i].mainImg) {
				var img = items[i].mainImg;

				if (img) {

					let future = new Future();
					let onComplete = future.resolver();
					let fsFile = new FS.File();

					fileId = fsFile.attachData(img, function(error) {
						if (error) resolve(error, null);
						return Images.insert(fsFile, function (err, fileObj) {
							onComplete(null, fileObj);
						});
					});

					if (fileId) {
						Items.update(id, {
							$set: {img: '/cfs/files/images/' + fileId._id}
							// $unset: {mainImg: '', mainImgMini: ''}
						});
						console.log('записал1');
						console.log(id);

					}
				}
			}
 
			//переписываем галерею
			if(items[i].galleryImg) {
				var argal = items[i].galleryImg;

				for (var y = 0; y < argal.length; y++) {

					var gal = argal[y];

					if(gal) {
						let future = new Future();
						let onComplete = future.resolver();
						let fsFile = new FS.File();
						fileId = fsFile.attachData(gal, function(error) {
							if (error) resolve(error, null);
							return Gallery.insert(fsFile, function (err, fileObj) {
								onComplete(null, fileObj);
							});
						});

						if (fileId) {
							Items.update(id, {
								$addToSet: {gallery: '/cfs/files/gallery/' + fileId._id}
							});
							console.log('записал2');
							console.log(id);
						}
					}

				}
 
				Items.update(id, {
					$unset: {galleryImg: [], mainImg: '', mainImgMini: ''}
				});
				
			}
			

		}
	}
});
