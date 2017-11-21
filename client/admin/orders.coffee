import moment from 'moment'

Template.orders.onCreated ->


Template.orders.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  date: (dat) ->
    return moment(dat).format('LL')
    
  orders: ->
    return OrdersList.find({},{sort: {number: -1, _createdAt: -1}})
  

Template.orders.events
  'change .active': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setFilterActive', e.currentTarget.id, e.currentTarget.checked, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'

          
  'click .delete': (e, tem) ->
    swal
      title: 'Вы уверены?',
      text: 'Удаление заказа необратимо',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: false,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteOrder', e.currentTarget.id, (error, res) ->
          if (res)
            swal
              title: 'Удалено',
              text: 'Заказ удалён',
              type: 'success',
              timer: 1500,
              showConfirmButton: false

