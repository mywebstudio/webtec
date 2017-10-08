Template.managecatalog.onRendered ->
  Meteor.setTimeout  =>
    CKEDITOR.replace 'description'
  , 3000

Template.managecatalog.onCreated ->
  instance = this
  this.subscribe 'Sections'


Template.managecatalog.helpers

  catalog:  ->
    Sections.findOne(FlowRouter.getParam('id'))

  isAdmin: ->
    if Meteor.user().roles == 'admin'
      return true

Template.managecatalog.events

  'change #name': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCatalogName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

  'change #sort': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCatalogOrder', FlowRouter.getParam('id'), Number(e.currentTarget.value), (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
          timeout: 5000

  'change #active': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCatalogActive', FlowRouter.getParam('id'), e.currentTarget.checked, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
          timeout: 5000



  'change #short': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCatalogShort', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
          timeout: 5000

  'click #descriptionsave': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCatalogDescription', FlowRouter.getParam('id'), CKEDITOR.instances['description'].getData(), (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
          timeout: 5000

  'change #mainImg': (event, template) ->
      files = event.target.files
      file = Images.insert(files[0])
      if file
        Meteor.call 'setCatalogImg', FlowRouter.getParam('id'), file._id, (err, res) ->
          if res
            UIkit.notification
              message: 'Изменения сохранены!',
              status: 'primary',
              pos: 'top-right',
              timeout: 5000
      else
        UIkit.notification
          message: 'Файл не прочитан'
          status: 'error'
          pos: 'top-right'
