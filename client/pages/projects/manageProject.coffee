# import ckeditor from 'ckeditor'

require('pdfmake/build/pdfmake.js')
require('pdfmake/build/vfs_fonts.js')

Template.manageProject.onCreated ->
	this.ready = new ReactiveVar false

	this.subscribe 'ItemsAll'
	this.subscribe 'Sections'
	this.subscribe 'TasksAll'

	@autorun =>
		subscription = this.subscribe 'ProjectsSmart'
		if subscription.ready()
			this.ready.set true

Template.manageProject.onRendered ->
	Meteor.setTimeout  =>
		CKEDITOR.replace 'description'
	, 3000

Template.manageProject.helpers
	isAdmin: ->
		if Meteor.user().roles == 'admin'
			return true 

	isReady: () ->
		return Template.instance().ready.get()

	progr: (taskId) ->
		task = Tasks.findOne(taskId)
		if (task.desstatus or task.devstatus) and task.status != 1
			return 50
		if  !task.desstatus and !task.devstatus and task.status != 1
			return 0
		if  task.desstatus and task.devstatus and task.status == 1
			return 100

	developer: ->
		task = Projects.findOne(FlowRouter.getParam('id'))
		if task.developer == Meteor.userId()
			return true

	manager: ->
		task = Projects.findOne(FlowRouter.getParam('id'))
		if task.manager == Meteor.userId()
			return true
			
	data: ->
		return Projects.findOne(FlowRouter.getParam('id'))
		
	tasks: ->
		return Tasks.find({project: FlowRouter.getParam('id')}, sort: {order: 1})

	managers: ->
		Meteor.users.find({active: true, roles: {$ne: 'user'}})

Template.manageProject.events
	'drop .task': (e, t) ->
		UIkit.notification
			message: 'Порядок задач изменён'
			status: 'primary'
			pos: 'top-right'
			timeout: 5000
		
	'change #manager': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectManager', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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


	'change #developer': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectDeveloper', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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


	'click .teh': (e, t) ->
		Meteor.call 'createProjectPdf', FlowRouter.getParam('id'), (err, res) ->
			if res
				pdfMake.createPdf(res).open()
			if err
				UIkit.notification
					message: err,
					status: 'error',
					pos: 'top-right'

	'click .offer': (e, t) ->
		Meteor.call 'createProjectDoc', FlowRouter.getParam('id'), (err, res) ->
			if res
				pdfMake.createPdf(res).open()
			if err
				UIkit.notification
					message: err,
					status: 'error',
					pos: 'top-right'


	'click .back': (e, t) ->
		Session.set 'hash', FlowRouter.getParam('id')


	'change #name': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        

	'change #short': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectShort', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'

	'click #descriptionsave': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectBrif', FlowRouter.getParam('id'), CKEDITOR.instances['description'].getData(), (err, res) ->
			if res
        UIkit.notification({
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        })

