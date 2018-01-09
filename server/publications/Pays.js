
Pays = new Mongo.Collection('pays');

Meteor.publish('PaysAll', function() {
	return Pays.find();
});



Meteor.publish('PaysSmart', function(limit) {
	if(this.userId) {
		if (Meteor.user().roles == 'admin')
			return Pays.find();

		if (Meteor.user().roles == 'user')
			return Pays.find({user: this.userId}, {sort: {_createdAt: -1}, limit: limit});

		// if (Meteor.user().roles == 'developer')
		// 	return Pays.find({developer: this.userId});
        //
		// if (Meteor.user().roles == 'manager')
		// 	return Pays.find({manager: this.userId});
	}
});

Meteor.publish('PaysOne', function(id) {
	return Pays.find({_id: id});
});
