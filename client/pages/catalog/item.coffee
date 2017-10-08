Template.item.onCreated ->

  this.subscribe('Sections')
  this.subscribe('FiltersList')
  @ready = new ReactiveVar false
  @autorun =>

    subscription = this.subscribe 'catalogItemOne', FlowRouter.getParam('item')
    this.ready.set subscription.ready()


Template.item.events
  'click .back': (e, t) ->
    Session.set 'hash', FlowRouter.getParam('item')


  'click .cart': (e, t) ->
    e.preventDefault()
    e.stopPropagation()

    Meteor.call 'addOrder', e.currentTarget.id, (err, res) ->
      if res
        UIkit.notification
          message: "Товар добавлен"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

Template.item.helpers
  itemId: ->
    if Template.instance().data.id
      return true
    else if Session.get('item') == false
      return false
      
  isAdmin: ->
    if Meteor.user().roles == 'admin'
      return true

  isReady: ->
    return Template.instance().ready.get()

  filters: ->
    return FiltersList.find({active: true, category: { $in: ['0', Template.instance().record.get().category ] } }).fetch()

  data: ->
    return Items.findOne({redirectUri: FlowRouter.getParam('item')})

    
Template.vnal.helpers
  vnal: ->
    if Template.instance().data.quant1 > 0
      return true

