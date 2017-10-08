Meteor.methods({
	deleteProjectChat(applicationId) {

		const application = RoomsList.findOne(applicationId);

		return RoomsList.remove(applicationId);
		
	}
});
