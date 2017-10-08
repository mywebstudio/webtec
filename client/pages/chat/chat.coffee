

Template.chat.onRendered ->
    Meteor.setTimeout =>
        $("#message-send").addClass('uk-button uk-button-primary uk-button-small')
    , 1000

Template.chat.onCreated ->

    this.subscribe 'userData'
    @ready = new ReactiveVar false
    
    
Template.chat.helpers
    activeuser: () ->
        isers = Meteor.users.find({_id: {$ne: Meteor.userId() }}).fetch()
        y = 0
        for i in isers
            if i._id == FlowRouter.getParam('id')
                return y
            else y++

    users: ->
        return Meteor.users.find().fetch()

    id: ->
        return FlowRouter.getParam('id')


Template.chat.events