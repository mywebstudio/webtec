import moment from 'moment'

 
Template.manageList.onCreated ->

  this.subscribe 'Sections'
  this.subscribe 'FiltersList'
  this.ready = new ReactiveVar false
  this.filter = new ReactiveVar('')
  instance = this
  escapeRegExp = require('lodash.escaperegexp')

  Tracker.autorun ->
    subscription = instance.subscribe 'ItemsAll'
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
        { price: filterReg }
        { category: filterReg }
      ]
    else
      query = {}

    Items.find(query, sort: {sort: -1}).fetch()

Template.manageList.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  isReady: ->
    return Template.instance().ready.get()

  applications: ->
    return Template.instance().items()

  categorys: ->
    return Sections.find()

  filters: ->
    return FiltersList.find({category: '0'}).fetch()

  sbrand: (filter, item) ->
    item = Items.findOne(item._id)
    if(item.farray[filter])
      return item.farray[filter]


Template.manageList.events
  'click .top': (e, t) ->
    scrollIntoView document.querySelector('#top-of-page')
    
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
          pos: 'top-right'

  'change .featured': (e, tm) ->
    Meteor.call 'setItemFeatured', e.currentTarget.id, e.currentTarget.checked, (err, res) ->
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

  'change .price': (e, tm) ->
    Meteor.call 'setItemPrice', e.currentTarget.id, Number(e.currentTarget.value), (err, res) ->
      if res
        Meteor.call 'setAllFilterPrice', (err, res2) ->
          if res2
            UIkit.notification
            message: 'Изменения сохранены, Сумма пересчитана!',
            status: 'primary',
            pos: 'top-right'
          if err
            console.log(err)

        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'


  'change .sort': (e, tm) ->
    Meteor.call 'setItemSort', e.currentTarget.id, Number(e.currentTarget.value), (err, res) ->
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


  'change .time': (e, tm) ->
    Meteor.call 'setItemTime', e.currentTarget.id, Number(e.currentTarget.value), (err, res) ->
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
      text: 'Удаление товара невозможно отменить',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: false,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteCatalogItem', e.currentTarget.id, (error, res) ->
          if (error)            
            swal.close()
          else
            swal
              title: 'Удалено',
              text: 'Товар удалён',
              type: 'success',
              timer: 1500,
              showConfirmButton: false


  'click #sinc': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'Sinc2', (error, res) ->
      if res
        toastr.success 'Синхронизация прошла успешно'
