import moment from 'moment'
import toastr from 'toastr'

Template.newsList.onCreated ->
  this.ready = new ReactiveVar false

  @autorun =>
      subscription = this.subscribe 'NewsList'
      this.ready.set subscription.ready()



Template.newsList.helpers
    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;
    title: ->
        return FlowRouter.getParam('category')

    isReady: ->
        return Template.instance().ready.get()

    news: ->
        NewsList.find({category: "Новости"},{sort: {_createdAt: -1}})

    time: (dat) ->
        moment(dat).format('LL');


Template.newsList.events

    'click .delete': (e, tm) ->
        swal
            title: 'Вы уверены?',
            text: 'Удаление статьи невозможно отменить',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, подтверждаю',
            cancelButtonText: 'Отмена',
            closeOnConfirm: false,
            html: false
        , (isConfirm) ->
            if(isConfirm)
                Meteor.call 'deleteNewsItem', e.currentTarget.id, (error, res) ->
                    if (error)
                        handleError(error)
                        swal.close()
                    else
                        swal
                            title: 'Удалено',
                            text: 'Стаья удалёна',
                            type: 'success',
                            timer: 1500,
                            showConfirmButton: false



Template.shortText.helpers
    text: ->
        html = Template.instance().data.text
        div = document.createElement("div")
        div.innerHTML = html
        text = div.textContent
        return text


Template.usernameFromId.helpers
    text: ->
        u = Meteor.users.findOne(Template.instance().data.user)
        if u.name
            return u.name
        else 
            return u.username


Template.timeLL.helpers
    text: ->
        return  moment(Template.instance().data.time).format('LL')


        
Template.newsList1.onCreated ->
    this.ready = new ReactiveVar false

    @autorun =>
        subscription = this.subscribe 'NewsList'
        this.ready.set subscription.ready()



Template.newsList1.helpers
    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;
    title: ->
        return FlowRouter.getParam('category')

    isReady: ->
        return Template.instance().ready.get()

    news: ->
        NewsList.find({category: "Новости"},{sort: {_createdAt: -1}})

    time: (dat) ->
        moment(dat).format('LL');


Template.newsList1.events

    'click .delete': (e, tm) ->
        swal
            title: 'Вы уверены?',
            text: 'Удаление статьи невозможно отменить',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, подтверждаю',
            cancelButtonText: 'Отмена',
            closeOnConfirm: false,
            html: false
        , (isConfirm) ->
            if(isConfirm)
                Meteor.call 'deleteNewsItem', e.currentTarget.id, (error, res) ->
                    if (error)
                        handleError(error)
                        swal.close()
                    else
                        swal
                            title: 'Удалено',
                            text: 'Стаья удалёна',
                            type: 'success',
                            timer: 1500,
                            showConfirmButton: false

