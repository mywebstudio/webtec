import moment from 'moment'

Template.ordersList.onCreated ->
  if this.data.limit
    Meteor.subscribe('Orders', this.data.limit );
  else
    Meteor.subscribe('Orders');

    
Template.ordersList.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  proj: (id) ->
    p = Projects.findOne(id)
    return p.name


  date: (dat) ->
    return moment(dat).format('LL')

  orders: ->
    return OrdersList.find({},{sort: {number: -1, _createdAt: -1}})

  short: ->
    return Template.instance().data.short
 
Template.ordersList.events
  'click .delete': (e, tm) ->
    swal
      title: 'Вы уверены?',
      text: 'Удаление заказа невозможно отменить',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: true,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteOrder', e.currentTarget.id, (error, res) ->
          if (res)
            swal
              title: 'Удалено',
              text: 'Заказ удалён',
              type: 'success',
              timer: 1000,
              showConfirmButton: false


