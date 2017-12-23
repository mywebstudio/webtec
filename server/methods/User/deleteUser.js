Meteor.methods({
	deleteUser(id) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'deleteCatalogItem' });
		// }
		const application = Meteor.users.findOne(id);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'User not found', { method: 'deleteUser' });
		}
		if (this.userId == id) {
			throw new Meteor.Error('error-application-not-found', 'Невозможно удалить самого себя', { method: 'deleteUser' });
		}

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-application-not-found', 'Недостаточно полномочий для этих действий', { method: 'deleteUser' });
		}
		// Удаляем проект и задания
		var projs = Projects.find({user: id}).fetch();
		for (var i = 0; i< projs.length; i++) {
			Meteor.call('deleteProject', projs[i]._id);
		}

		// Удаляем платежи
		var pays = Pays.find({user: id}).fetch();
		for (var i = 0; i< pays.length; i++) {
			Pays.remove(pays[i]._id)
		}


		Meteor.users.remove(id);
		
		
		return true;
	}
});
