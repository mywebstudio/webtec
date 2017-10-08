import moment from 'moment'

 
Template.manageCatalogList.onCreated ->

  this.ready = new ReactiveVar false
  instance = this
  escapeRegExp = require('lodash.escaperegexp')

  Tracker.autorun ->
    subscription = instance.subscribe 'Sections'
    instance.ready.set subscription.ready()

  this.sections = ->

    filter = undefined
    query = undefined
    if this.filter and this.filter.get()
      filter = this.filter.get()
    if filter
      filterReg = new RegExp(escapeRegExp(filter), 'i')
      query = $or: [
        { articul: filterReg }
        { name: filterReg }
        { price: filterReg }
        { category: filterReg }
      ]
    else
      query = {}

    Sections.find(query, {sort: {sort: -1}}).fetch()

Template.manageCatalogList.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  isReady: ->
    return Template.instance().ready.get()

  sections: ->
    return Template.instance().sections()


Template.manageCatalogList.events

  'keyup #users-filter': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    t.filter.set e.currentTarget.value
    return   
    

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

  'click .delete': (e, tm) ->
    swal
      title: 'Вы уверены?',
      text: 'Удаление раздела невозможно отменить',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: false,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteSection', e.currentTarget.id, (error, res) ->
          if (error)
            handleError(error)
            swal.close()
          else
            swal
              title: 'Удалено',
              text: 'Товар удалён',
              type: 'success',
              timer: 1500,
              showConfirmButton: false

