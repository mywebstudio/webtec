Meteor.publish('userData', function() {
	if (!this.userId) {
		return this.ready();
	}

	if(Meteor.user().roles == 'admin') {
		return Meteor.users.find();
	}

	if(Meteor.user().roles == 'manager') {
		return Meteor.users.find({manager: this.userId});
	}
	
	if(Meteor.user().roles == 'developer') {
		return Meteor.users.find(Meteor.user().manager);
	}


	if(Meteor.user().roles == 'user') {

		return Meteor.users.find(Meteor.user().manager, {fields: {name: 1, avatar: 1, tel: 1, username: 1}});
	}

});

Meteor.publish('myUserData', function() {
	if (!this.userId) {
		return this.ready();
	}

	if(Meteor.user().roles == 'admin' && Meteor.user().super == true ) {
		return Meteor.users.find();
	}
	else
		return Meteor.users.find(this.userId);
});

Meteor.publish('adminData', function() {
	if (!this.userId) {
		return this.ready();
	}

	else
		return Meteor.users.find({roles: 'admin'}, {fields: {name: 1, avatar: 1, tel: 1, username: 1}});
});

