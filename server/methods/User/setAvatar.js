Meteor.methods({
	setAvatar(id, photoUpload) {

		var currentUser = Meteor.users.findOne(this.userId);

		if (!Meteor.users.findOne(id)) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setAvatar' });
		} else {
			var user = Meteor.users.findOne(id);
		}
		if (user._id != currentUser._id && currentUser.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setAvatar' });
		}
		

			if (photoUpload) {

				var curIm = user.avatar;
				if(curIm) Avatars.remove(curIm.slice(19));

				Meteor.users.update(id, {
					$set: {avatar: 'https://tecweb.ru/cfs/files/avatars/' + photoUpload}
				});
			} 
		}
	
});
