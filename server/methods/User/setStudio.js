import { Random } from 'meteor/random'

Meteor.methods({
	setStudio(name) {
		
		// check(name, String);
		// check(id, String);
		
		var sid = Studio.insert({_createdAt: new Date(), user: this.userId});

		
		Meteor.users.update(this.userId, {
			$set: {studio: sid, roles: 'studio'}
		});

		return true
	}
});