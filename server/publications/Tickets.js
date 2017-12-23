
Tickets = new Mongo.Collection('tickets');

Meteor.publish('TicketsAll', function() {
	return Tickets.find();
});


Meteor.publish('TicketsSmart', function() {
	if(this.userId) {
		if (Meteor.user().roles == 'admin')
			return Tickets.find();

		if (Meteor.user().roles == 'user')
			return Tickets.find({user: this.userId});

		// if (Meteor.user().roles == 'developer')
		// 	return Tickets.find({developer: this.userId});
        //
		// if (Meteor.user().roles == 'manager')
		// 	return Tickets.find({manager: this.userId});
	}
});

Meteor.publish('TicketsOne', function(id) {
	return Tickets.find({_id: id});
});
