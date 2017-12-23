# import ckeditor from 'ckeditor'
import moment from 'moment'
import { Files } from '/lib/files.js';

require('pdfmake/build/pdfmake.js')
require('pdfmake/build/vfs_fonts.js')

Template.manageProject.onCreated ->
	this.ready = new ReactiveVar false
	this.currentUpload = new ReactiveVar false
	this.sortlabel = new ReactiveVar
	this.showend = new ReactiveVar false

	this.subscribe 'ItemsAll'
	this.subscribe 'Sections'
	this.subscribe 'TasksAll'
	this.subscribe 'TicketsSmart'

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
		return Tasks.find({project: FlowRouter.getParam('id'), level: 'general'}, sort: {order: 1})

	tickets: ->
		el = Template.instance().sortlabel.get()
		st = Template.instance().showend.get()
		if el
			return Tasks.find({project: FlowRouter.getParam('id'), labels:  el}, sort: {_createdAt: -1, order: -1})
		if st
			return Tasks.find({project: FlowRouter.getParam('id'), status:  1}, sort: {_createdAt: -1, order: -1})
		else
			return Tasks.find({project: FlowRouter.getParam('id')}, sort: {_createdAt: -1, order: -1})


	managers: ->
		Meteor.users.find({active: true, roles: {$ne: 'user'}})

	billdate: (id) ->
		return moment(id).format('LL')

	labeltitle: (id) ->
		t = Tasks.findOne(id)
		return t.title.substr(0, 15) + '..'

	linkx: (id) ->
		return Files.findOne(id).link();



Template.manageProject.events
	'drop .task': (e, t) ->
		UIkit.notification
			message: 'Порядок задач изменён'
			status: 'primary'
			pos: 'top-right'
			timeout: 5000
		
	'click #tadd': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		arr = [];
		$('.labels:checked').each ->
			arr.push @id
			$(@).prop('checked', false);

		list = [];
		$('.checklist').each ->
			list.push $(@).text()
			$(@).remove()

		Meteor.call 'addTicket', FlowRouter.getParam('id'), $('#tname').val(), $('#ttext').val(), $('#tcolor').val(), $("#fileupl").val(), arr, list, (err, res) ->
			if res
				$('#tbody').addClass('uk-hidden')
				$('#tfooter').addClass('uk-hidden')
				$('#ttogle').toggleClass('uk-hidden')
				$('#tname').val('')
				$('#ttext').val('')
				$('#tcolor').val('')
				$('#fileupl').val('')
				UIkit.notification
					message: 'Добавлено'
					status: 'primary'
					pos: 'top-right'
					timeout: 5000
				Meteor.call 'addTicketEmail', res, () ->
			if err
				UIkit.notification
					message: err
					status: 'error'
					pos: 'top-right'
					timeout: 5000
		
	'click .ttrash': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'removeTicket', e.currentTarget.id, (err, res) ->
			if res
				UIkit.notification
					message: 'Удалено'
					status: 'primary'
					pos: 'top-right'
					timeout: 5000
			if err
				UIkit.notification
					message: err
					status: 'error'
					pos: 'top-right'
					timeout: 5000

	'click .tcheck': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setTaskSatus', e.currentTarget.id, (err, res) ->
			if res
				UIkit.notification
					message: 'Удалено'
					status: 'primary'
					pos: 'top-right'
					timeout: 5000
				Meteor.call('sendTaskStatus', FlowRouter.getParam('id') e.currentTarget.id )
			if err
				UIkit.notification
					message: err
					status: 'error'
					pos: 'top-right'
					timeout: 5000
					
	'change .curcheck': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'removeTicketList', e.currentTarget.name, e.currentTarget.id, e.currentTarget.checked, (err, res) ->
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


	'click .sortlabel': (e, t) ->
		t.sortlabel.set(e.currentTarget.id)
		t.showend.set(false)

	'click #showend': (e, t) ->
		t.sortlabel.set()
		t.showend.set(true)

	'click #teh': (e, t) ->
		Meteor.call 'createProjectPdf', FlowRouter.getParam('id'), (err, res) ->
			if res
				pdfMake.createPdf(res).open()
			if err
				UIkit.notification
					message: err,
					status: 'error',
					pos: 'top-right'

	'click #offer': (e, t) ->
		Meteor.call 'createProjectDoc', FlowRouter.getParam('id'), (err, res) ->
			if res
				pdfMake.createPdf(res).open()
			if err
				UIkit.notification
					message: err,
					status: 'error',
					pos: 'top-right'

	'click #compred': (e, t) ->
		Meteor.call 'createProjectCompred', FlowRouter.getParam('id'), (err, res) ->
			if res
				pdfMake.createPdf(res).open()
			if err
				UIkit.notification
					message: err,
					status: 'error',
					pos: 'top-right'

	'click #spec': (e, t) ->
		Meteor.call 'createProjectSpec', FlowRouter.getParam('id'), (err, res) ->
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
				$('#pname').toggleClass('uk-hidden')
				$('#name').toggleClass('uk-hidden')
				$('#pdes').toggleClass('uk-hidden')
				$('#short').toggleClass('uk-hidden')

	'change #short': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setProjectShort', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'
				$('#pname').toggleClass('uk-hidden')
				$('#name').toggleClass('uk-hidden')
				$('#pdes').toggleClass('uk-hidden')
				$('#short').toggleClass('uk-hidden')

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

	'change #fileInput': (e, template) ->
		if e.currentTarget.files and e.currentTarget.files[0]
			upload = Files.insert({
				file: e.currentTarget.files[0],
				streams: 'dynamic',
				chunkSize: 'dynamic'
			}, false);

			upload.on 'start', ->
				template.currentUpload.set this

			upload.on 'end', (error, fileObj) ->
				if fileObj
					alert 'File "' + fileObj.name + '" successfully uploaded'
					console.log fileObj
					$("#fileupl").val(fileObj._id)
				if error
					alert error

			template.currentUpload.set false

			upload.start()
