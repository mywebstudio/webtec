import toastr from 'toastr'
import mime from 'mime-type/with-db'

Template.manageUser.onRendered ->
#  altair_md.init()

Template.manageUser.onCreated ->
  instance = this
  this.subscribe('userData')
  this.upload = new ReactiveVar
  

Template.manageUser.helpers
  user: ->
    Meteor.users.findOne(FlowRouter.getParam('id'))

  mail: ->
    user = Meteor.users.findOne(FlowRouter.getParam('id'))
    return user.emails[0].address
        
  managers: ->
    Meteor.users.find({roles: 'manager', act: {$ne: false}})
    
  upload: ->
    return Template.instance().upload.get();

  isAdmin: ->
    if Meteor.user().roles == 'admin'
      return true

Template.manageUser.events

  'change #fileInput': (event, instance) ->
    photoUpload = new FS.File(document.getElementById('fileInput').files[0])
    if (photoUpload)   
      pic = Avatars.insert photoUpload, (error, file) ->
        if file 
          return file._id

      if pic._id
        Meteor.call 'setAvatar', FlowRouter.getParam('id'), pic._id, (err, res) ->
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
      

  'change #balance': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setBalance', FlowRouter.getParam('id'), Number(e.currentTarget.value), (err, res) ->
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
          
  'change #discont': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setDiscont', FlowRouter.getParam('id'), Number(e.currentTarget.value), (err, res) ->
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

  'change #name': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

  'change #city': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setCity', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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
  
  'change #adress': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setAdress', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

  'change #tel': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setTel', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

  'change #manager': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setManager', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

  'change #active': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setActive', FlowRouter.getParam('id'), $("#active").is(":checked"), (err, res) ->
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

  'change #rol': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setRol', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
            message: res
            status: 'primary'
            pos: 'top-right'
            timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'change #description': (e, t) ->
    e.stopPropagation()
    e.preventDefault()

    Meteor.call 'setDescription', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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


  'change #mail': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setEmail', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
            message: res
            status: 'primary'
            pos: 'top-right'
            timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000
