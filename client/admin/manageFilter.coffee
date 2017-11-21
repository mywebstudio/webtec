# import ckeditor from 'ckeditor'

Template.manageFilter.onCreated ->
  this.subscribe 'Filters'
  this.subscribe 'ItemsAll'


Template.manageFilter.onRendered ->
  Meteor.setTimeout  =>
    CKEDITOR.replace 'description'
  , 3000

Template.manageFilter.helpers
  filter: ->
    FiltersList.findOne(FlowRouter.getParam('id'))

  itemslist: ->
    return Items.find().fetch()

  lectors1:(id) ->
    cur = FiltersList.findOne(FlowRouter.getParam('id'))
    if cur.items
      if cur.items.indexOf(id) != -1
        return true

  isAdmin: ->
    if Meteor.user().roles == 'admin'
      return true
 
Template.manageFilter.events

  'change #name': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
            message: 'Изменения сохранены!'
            status: 'primary'
            pos: 'top-right'
            timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'change #fitems': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterItems', FlowRouter.getParam('id'), $('#fitems').val(), (err, res) ->
      if res
        Meteor.call 'setFilterPrice', FlowRouter.getParam('id'), (err, res) ->
          if res
            UIkit.notification
            message: 'Сумма пересчитана!',
            status: 'primary',
            pos: 'top-right'
          if err
            console.log(err)

        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'
      if err
        console.log(err)

  'change #mainImg': (event, template) ->
    console.log 'нажал'
    files = event.target.files
    file = Images.insert(files[0])
    if file
      Meteor.call 'setFilterImg', FlowRouter.getParam('id'), file._id, (err, res) ->
        if res
          UIkit.notification
            message: 'Изменения сохранены!',
            status: 'primary',
            pos: 'top-right',
            timeout: 5000
          if err
            console.log err
    else
      UIkit.notification
        message: 'Файл не прочитан'
        status: 'error'
        pos: 'top-right'


  'click #descriptionsave': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterDescription', FlowRouter.getParam('id'), CKEDITOR.instances['description'].getData(), (err, res) ->
      if res
        UIkit.notification({
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        })


  'change #short': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterShort', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'

  'change #active': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterActive', FlowRouter.getParam('id'), e.currentTarget.checked, (err, res) ->
      if res
        UIkit.notification
            message: 'Изменения сохранены!'
            status: 'primary'
            pos: 'top-right'
            timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000
