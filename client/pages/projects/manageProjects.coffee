import moment from 'moment'
#import 'moment-duration-format'

 
Template.manageProjects.onRendered ->
#  modernizr = require("modernizr");
#  $(->
#    altair_gantt.init()
#    return
#  )
  altair_gantt = init: ->
    ganttData = []
    projects = Projects.find().fetch()
    for project in projects
      series = []
      tasks = Tasks.find({project: project._id, level: 'general'},{sort: {color: 1}}).fetch()
      for task in tasks
        series.push
          id: task.order
          _id: task._id
          name: task.title
          start: task.start
          end: task.end
          color: task.color
          title: task.title
          link: 'https://tecweb.ru/tasks/' + task._id
          user_name: task.manager
          user_avatar: task.img

      ganttData.push
        name: project.name
        series: series

    n = $('#gantt_chart')

    n.length and n.ganttView(
      data: ganttData
      endDate: '12/31/2017'
      behavior:
        onClick: (n) ->
          console.log 'You clicked on an event: \n', n
          return
        onResize: (n) ->
          Meteor.call 'dragTask', n._id, n.start._d, n.end._d,  (err, res) ->
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
                
          console.log 'You resized an event: \n', n
          return
        onDrag: (n) ->
          console.log 'You dragged an event: \n', n
          console.log n.start
          Meteor.call 'dragTask', n._id, n.start._d, n.end._d,  (err, res) ->
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
                
          console.log 'You dragged an event: \n', n
          return
    )
    n.find('[title]').each(->
      $(this).attr 'data-uk-tooltip', '{offset:4}'
      return
    )
    return

  Meteor.setTimeout =>
    altair_gantt.init()
  , 1000

Template.manageProjects.onCreated ->

  this.subscribe 'Sections'
  this.subscribe 'FiltersList'
  this.subscribe 'TasksSmart'
  this.ready = new ReactiveVar false
  this.filter = new ReactiveVar('')
  instance = this
  escapeRegExp = require('lodash.escaperegexp')

  Tracker.autorun ->
    subscription = instance.subscribe 'ProjectsSmart'
    instance.ready.set subscription.ready()

  this.items = ->

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

    Projects.find(query).fetch()

Template.manageProjects.helpers
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

  progres: (id) ->
    project = Projects.findOne(id)
    tasks = Tasks.find({project: project._id}).fetch()
    tasksFinished = Tasks.find({project: project._id, status: 1}).fetch()
    return Number(tasksFinished.length) * 100 / Number(tasks.length)

  task: (id) ->
    project = Projects.findOne(id)
    tasks = Tasks.find({project: project._id}, {sort: {order: 1}}).fetch()
    return tasks

  billnumber: (id) ->
    String(id)
    order = OrdersList.findOne(String(id))
    return order.number

  billdate: (id) ->
    return moment(id).format('LL')

  progresreg: (id) ->
    project = Projects.findOne(id)
    date = new Date(project._createdAt)
    date2 = new Date()
    timeDiff = Math.abs(date2.getTime() - date1.getTime())
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays

  payprogres: (id) ->
    project = Projects.findOne(id)
    return Number(project.payed) / Number(project.sum)

Template.manageProjects.events
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



  'click .delete': (e, tm) ->
    swal
      title: 'Вы уверены?',
      text: 'Удаление проекта невозможно отменить',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: true,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteProject', e.currentTarget.id, (error, res) ->
          if (res)
            swal
              title: 'Удалено',
              text: 'Проект удалён',
              type: 'success',
              timer: 1000,
              showConfirmButton: false
            Meteor.call('sendRemoveProject', res);
