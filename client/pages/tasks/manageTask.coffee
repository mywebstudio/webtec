import ckeditor from 'ckeditor'

Template.manageTask.onCreated ->
	this.subscribe 'TasksAll'
	this.subscribe 'ItemsAll'
	this.subscribe 'Sections'


Template.manageTask.onRendered ->
	Meteor.setTimeout  =>
		CKEDITOR.replace 'description'
	, 3000

Template.manageTask.helpers
	isAdmin: ->
		if Meteor.user().roles == 'admin'
			return true

	desinger: ->
		task = Tasks.findOne(FlowRouter.getParam('id'))
		if task.desinger == Meteor.userId()
			return true

	developer: ->
		task = Tasks.findOne(FlowRouter.getParam('id'))
		if task.developer == Meteor.userId()
			return true

	manager: ->
		task = Tasks.findOne(FlowRouter.getParam('id'))
		if task.manager == Meteor.userId()
			return true

	data: ->
		return Tasks.findOne(FlowRouter.getParam('id'))

	managers: ->
		Meteor.users.find({active: true, roles: {$ne: 'user'}})


Template.manageTask.events
	'click .offer': (e, t) ->


	'click .back': (e, t) ->
		Session.set 'hash', FlowRouter.getParam('id')


	'click #readyTask': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		console.log( ' 0 ' )
		Meteor.call 'setTaskSatus', FlowRouter.getParam('id'), (err, res) ->
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
					
	'click #readyDevTask': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setTaskDevSatus', FlowRouter.getParam('id'), (err, res) ->
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

	'click #readyDesTask': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setTaskDesSatus', FlowRouter.getParam('id'), (err, res) ->
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
		Meteor.call 'setTaskDeveloper', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

	'change #desinger': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setTaskDesinger', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
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

