import moment from 'moment'

Template.paysList.onCreated ->
  Meteor.subscribe('PaysSmart');

Template.paysList.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  date: (dat) ->
    return moment(dat).format('LL HH:mm')

  proj: (id) ->
    p = Projects.findOne(id)
    return p.name
    
  pays: -> 
    return Pays.find({},{sort: {_createdAt: -1}})
  

Template.paysList.events

