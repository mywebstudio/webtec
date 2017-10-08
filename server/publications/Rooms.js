RoomsList = new Mongo.Collection('rooms');

Meteor.publish('Rooms', function() {

	return RoomsList.find();

}); 