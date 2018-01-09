import moment from 'moment'

Template.paysList.onCreated ->
  if this.data.limit
    Meteor.subscribe('PaysSmart', this.data.limit );
  else
    Meteor.subscribe('PaysSmart');

Template.paysList.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  date: (dat) ->
    return moment(dat).format('DD.MM.YY HH:mm')

  proj: (id) ->
    p = Projects.findOne(id)
    return p.name
    
  pays: -> 
    return Pays.find({},{sort: {_createdAt: -1}})

  short: ->
    return Template.instance().data.short
Template.paysList.events

