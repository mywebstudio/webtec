import moment from 'moment'

 
Template.manageTasks.onCreated ->

  this.ready = new ReactiveVar false
  this.filter = new ReactiveVar('')
  instance = this
  escapeRegExp = require('lodash.escaperegexp')

  Tracker.autorun ->
    subscription = instance.subscribe 'TasksSmart'
    instance.ready.set subscription.ready()

  this.items = ->

    filter = undefined
    query = undefined
    if this.filter and this.filter.get()
      filter = this.filter.get()
    if filter
      filterReg = new RegExp(escapeRegExp(filter), 'i')
      query = $or: [
        { name: filterReg }
      ]
    else
      query = {}

    Tasks.find(query).fetch()

Template.manageTasks.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  isReady: ->
    return Template.instance().ready.get()

  tasks: ->
    return Template.instance().items()

  projectname: (projectId) ->
    project = Projects.findOne(projectId)
    return project.name

  desinger: ->
    if Meteor.user().roles == 'desinger'
      return true

  developer: ->
    if Meteor.user().roles == 'developer'
      return true

  useradminmanager: ->
    if Meteor.user().roles == 'admin' or Meteor.user().roles == 'manager' or Meteor.user().roles == 'user'
      return true

  progr: (taskId) ->
    task = Tasks.findOne(taskId)
    if (task.desstatus or task.devstatus) and task.status != 1
      return 50
    if  !task.desstatus and !task.devstatus and task.status != 1
      return 0
    if  task.desstatus and task.devstatus and task.status == 1
      return 100


Template.manageTasks.events
  'click .top': (e, t) ->
    scrollIntoView document.querySelector('#top-of-page')
    
  'keyup #users-filter': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    t.filter.set e.currentTarget.value
    return


  'click .readyTask': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    console.log( ' 0 ' )
    Meteor.call 'setTaskSatus', e.currentTarget.id, (err, res) ->
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

  'click .readyDevTask': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setTaskDevSatus', e.currentTarget.id, (err, res) ->
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

  'click .readyDesTask': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setTaskDesSatus', e.currentTarget.id, (err, res) ->
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

  'change .active': (e, tm) ->
    Meteor.call 'setItemActive', e.currentTarget.id, e.currentTarget.checked, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'


  'click .delete': (e, tm) ->
    swal
      title: 'Вы уверены?',
      text: 'Удаление проекта невозможно отменить',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: false,
      html: false
    , (isConfirm) ->
      if(isConfirm)
       Tasks.remove e.currentTarget.id
       swal
         title: 'Удалено',
         text: 'Проект удалён',
         type: 'success',
         timer: 1500,
         showConfirmButton: false