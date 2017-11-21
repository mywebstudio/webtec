import moment from 'moment'
 
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

	revsub: (arr) ->
		return arr.reverse()

	managers: ->
		Meteor.users.find({active: true, roles: {$ne: 'user'}})
		
	subdate: (date) ->
		return moment(date).format('LL')


Template.manageTask.events
	'click .offer': (e, t) ->


	'click .back': (e, t) ->
		Session.set 'hash', FlowRouter.getParam('id')

 
	'click .subclose': (e, t) ->
		Meteor.call 'endTaskSub', FlowRouter.getParam('id'), e.currentTarget.id, (err, res) ->
			if res
				UIkit.notification({
					message: 'Изменения сохранены!',
					status: 'primary',
					pos: 'top-right',
					timeout: 5000
				})

 
	'click #descriptionsave': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setTaskSub', FlowRouter.getParam('id'), CKEDITOR.instances['description'].getData(), (err, res) ->
			if res
				UIkit.notification({
					message: 'Изменения сохранены!',
					status: 'primary',
					pos: 'top-right',
					timeout: 5000
				})

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