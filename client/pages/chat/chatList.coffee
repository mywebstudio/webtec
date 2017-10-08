
Template.chatList.onCreated ->


    this.subscribe 'userData'
    this.subscribe 'Rooms'


    
Template.chatList.helpers
    user: ->
        return Meteor.users.find().fetch()

    rooms: ->
        return RoomsList.find().fetch();


Template.chatList.events