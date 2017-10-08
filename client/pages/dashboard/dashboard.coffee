import moment from 'moment'
#import 'moment-duration-format'


Template.dashboard.onRendered ->
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
            tasks = Tasks.find({project: project._id},{sort: {color: 1}}).fetch()
            for task in tasks
                series.push
                    id: task.order
                    _id: task._id
                    name: task.title
                    start: task.start
                    end: task.end
                    color: task.color
                    title: task.title
                    link: '/tasks/' + task._id
                    user_name: task.manager
                    user_avatar: "/avarats/"+task.name

            ganttData.push
                name: project.name
                series: series

        console.log ganttData
        n = $('#gantt_chart')

        n.length and n.ganttView(
            data: ganttData
            endDate: '12/31/2017'
            behavior:
                onClick: (n) ->
                    console.log 'You clicked on an event: \n', n
                    return
                onResize: (n) ->
                    UIkit.notification
                        message: 'Только менеджер может задавать сроки задач'
                        status: 'error'
                        pos: 'top-right'

                    return
                onDrag: (n) ->
                    UIkit.notification
                        message: 'Только менеджер может задавать сроки задач'
                        status: 'error'
                        pos: 'top-right'
                    return
        )
        n.find('[title]').each(->
            $(this).attr 'data-uk-tooltip', '{offset:4}'
            return
        )
        return

    Meteor.setTimeout =>
        altair_gantt.init()
        this.ready.set true
    , 1000

Template.dashboard.onCreated ->

    this.subscribe 'Sections'
    this.subscribe 'TasksSmart'
    this.subscribe 'ProjectsSmart'
    this.subscribe 'FiltersList'
    this.ready = new ReactiveVar false


    this.items = ->
        Projects.find().fetch()

Template.dashboard.helpers
    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;

    isReady: ->
        return Template.instance().ready.get()

    applications: ->
        return Template.instance().items()

    categorys: ->
        return Sections.find()

    sbrand: (filter, item) ->
        item = Items.findOne(item._id)
        if(item.farray[filter])
            return item.farray[filter]

    progres: (id) ->
        project = Projects.findOne(id)
        tasks = Tasks.find({project: project._id}).fetch()
        tasksFinished = Tasks.find({project: project._id, status: 1}).fetch()
        return Number(tasksFinished.length) * 100 / Number(tasks.length)

    currentTask: (id) ->
        project = Projects.findOne(id)
        tasks = Tasks.find({project: project._id, status: {$exists: false}}, {sort: {order: 1}}).fetch()
        return tasks[0].name

    task: (id) ->
        project = Projects.findOne(id)
        tasks = Tasks.find({project: project._id}, {sort: {order: 1}}).fetch()
        return tasks
        
    user: ->
        Meteor.users.findOne(Meteor.userId())
        
    mail: ->
        user = Meteor.users.findOne(Meteor.userId())
        return user.emails[0].address
        
    upload: ->
        return Template.instance().upload.get();



Template.dashboard.events
    'click .top': (e, t) ->
        scrollIntoView document.querySelector('#top-of-page')

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

    'change #fileInput': (event, instance) ->
        photoUpload = new FS.File(document.getElementById('fileInput').files[0])
        if (photoUpload)
            pic = Avatars.insert photoUpload, (error, file) ->
                if file
                    return file._id
            if pic._id
                Meteor.call 'setAvatar', Meteor.userId(), pic._id, (err, res) ->
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
        Meteor.call 'setName', Meteor.userId(), e.currentTarget.value, (err, res) ->
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
        Meteor.call 'setAdress', Meteor.userId(), e.currentTarget.value, (err, res) ->
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
        Meteor.call 'setTel', Meteor.userId(), e.currentTarget.value, (err, res) ->
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
    'change #description': (e, t) ->
        e.stopPropagation()
        e.preventDefault()
        Meteor.call 'setDescription', Meteor.userId(), e.currentTarget.value, (err, res) ->
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
        Meteor.call 'setEmail', Meteor.userId(), e.currentTarget.value, (err, res) ->
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
