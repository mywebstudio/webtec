import moment from 'moment'

Template.new.onCreated ->
  this.ready = new ReactiveVar true
  this.subscribe 'NewsList'

  @autorun =>
      subscription = this.subscribe 'NewsOne', FlowRouter.getParam('alias')
      this.ready.set subscription.ready()
       

Template.new.helpers
    isReady: ->
        return Template.instance().ready.get()

    news: ->
        id = NewsList.findOne({alias: FlowRouter.getParam('alias')})
        Session.set 'newsId', id._id
        return id
        
    isAdmin: ->
      if Meteor.user().roles == 'admin'
        return true

    resent: ->
      return NewsList.find({category: 'Новости'},{sort: {_createdAt: -1}}).fetch()

Template.new.events
  'change .mainimgch': (event, t) ->
    files = event.target.files
    file = Images.insert(files[0])
    if file._id != null
      Meteor.call 'setNewsImg', Session.get('newsId'), file._id, (err, res) ->
        if res
          UIkit.notification
            message: 'Изменения сохранены!',
            status: 'primary',
            pos: 'top-right'
    else
      UIkit.notification
        message: 'Файл не прочитан'
        status: 'error'
        pos: 'top-right'
        

  'change .namech': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setNewsName', e.currentTarget.id, e.currentTarget.value, (err, res) ->
      if res
        toastr.success "Изменения сохранены"
      if err
        toastr.error err

  'click .savetext': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setNewsText', e.currentTarget.id, CKEDITOR.instances['description'].getData(), (err, res) ->
      if res
        toastr.success "Изменения сохранены"

Template.new.onRendered ->
  Meteor.setTimeout  =>
    CKEDITOR.replace 'description'
  , 1500