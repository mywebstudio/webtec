

Template.manageItem.onCreated ->
	this.subscribe 'Sections'
	this.subscribe 'FiltersList'

	this.ready = new ReactiveVar false


	this.autorun =>
		subscription = this.subscribe 'ItemsAll'
		this.ready.set subscription.ready()

#
#Template.manageItem.onRendered ->
#	Meteor.setTimeout  =>
#		CKEDITOR.replace 'description'
#	, 3000

Template.manageItem.helpers
	filter: ->
		data = Items.findOne(FlowRouter.getParam('id'))
		return FiltersList.find({category: { $in: ['0', data.category ] } }).fetch()

	isReady: ->
		return Template.instance().ready.get()

	data: ->
		return Items.findOne(FlowRouter.getParam('id'))

	items: ->
		return Items.find()

	lectors1:(id) ->
		cur = Items.findOne(FlowRouter.getParam('id'))
		if cur.related
			if cur.related.indexOf(id) != -1
				return true
		
	sfilter: (filter, value) ->
		x = Items.findOne(FlowRouter.getParam('id'))
		if x.farray[filter] == value
			return true

	categorys: ->
		return Sections.find().fetch()

Template.manageItem.events

	'click .back': (e, t) ->
		Session.set 'hash', FlowRouter.getParam('id')

	'click .moder': (e, t) ->
		Meteor.call 'setItemModer', FlowRouter.getParam('id'), (err, res) ->
			if res
				UIkit.notification
					message: 'Изменения сохранены!'
					status: 'primary'
					pos: 'top-right'


	'change #active': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemActive', FlowRouter.getParam('id'), e.currentTarget.checked, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'

	'change #featured': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemFeatured', FlowRouter.getParam('id'), e.currentTarget.checked, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'


	'change #hide': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemHide', FlowRouter.getParam('id'), e.currentTarget.checked, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'


	'change #name': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification({
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        })

	'change #sort': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemSort', FlowRouter.getParam('id'), Number(e.currentTarget.value), (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000


	'change #price': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemPrice', FlowRouter.getParam('id'), Number(e.currentTarget.value), (err, res) ->
			if res
				Meteor.call 'setAllFilterPrice', (err, res2) ->
					if res2
						UIkit.notification
							message: 'Изменения сохранены, Сумма пересчитана!',
							status: 'primary',
							pos: 'top-right'
					if err
						console.log(err)


	'change #meter': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemMeter', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000


	'change .uk-checkbox1': (e, t) ->
		Meteor.call 'setItemType', FlowRouter.getParam('id'), e.currentTarget.id, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'


	'change #short': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemShort', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'

	'change #teh': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemTeh', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'
					
	'change #time': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemTime', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'


	'change #related': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemRelated', FlowRouter.getParam('id'), $('#related').val(), (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'


	'change #category': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemCategory', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
			if res
        UIkit.notification
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right'

	'click #descriptionsave': (e, t) ->
		e.stopPropagation()
		e.preventDefault()
		Meteor.call 'setItemDescription', FlowRouter.getParam('id'), CKEDITOR.instances['description'].getData(), (err, res) ->
			if res
        UIkit.notification({
          message: 'Изменения сохранены!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        })

	'change #mainImg': (event, template) ->
		files = event.target.files
		file = Images.insert(files[0])
		if file
			Meteor.call 'setItemImg', FlowRouter.getParam('id'), file._id, (err, res) ->
				if res
					UIkit.notification
						message: 'Изменения сохранены!',
						status: 'primary',
						pos: 'top-right',
						timeout: 5000
		else
			UIkit.notification
				message: 'Файл не прочитан'
				status: 'error'
				pos: 'top-right'


	'change #galleryImg': (event, template) ->
		files = event.target.files
		file = Gallery.insert(files[0])
		if file
			Meteor.call 'setItemGalery', FlowRouter.getParam('id'), file._id, (err, res) ->
				if res
					UIkit.notification
						message: 'Изменения сохранены!'
						status: 'primary'
						pos: 'top-right'
		else
			UIkit.notification
				message: 'Файл не прочитан'
				status: 'error'
				pos: 'top-right'


	'click .gal-delete': (e, t) ->
		Meteor.call 'unsetItemGalleryImg', FlowRouter.getParam('id'), e.currentTarget.id, (err, res) ->
			if res
				UIkit.notification
					message: 'Изменения сохранены!'
					status: 'primary'
					pos: 'top-right'
