import moment from 'moment'
import toastr from 'toastr'

Template.actionsList.onCreated ->
  this.ready = new ReactiveVar false

  @autorun =>
      subscription = this.subscribe 'NewsList'
      this.ready.set subscription.ready()



Template.actionsList.helpers
    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;
            
    title: ->
        return FlowRouter.getParam('category')

    isReady: ->
        return Template.instance().ready.get()

    news: ->
        NewsList.find({category: "Акции"},{sort: {_createdAt: -1}})

    time: (dat) ->
        moment(dat).format('LL');


Template.actionsList.events

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

