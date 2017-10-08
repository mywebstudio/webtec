

Template.manageFilters.onCreated ->
  this.subscribe 'Filters'
  this.subscribe 'ItemsAll'


Template.manageFilters.helpers
  isAdmin: ->
    if  Meteor.user() and Meteor.user().roles == 'admin'
      return true;

  filter: ->
    return FiltersList.find()

  itemname: (id) ->
    item = Items.findOne(id)
    return item.name
  

Template.manageFilters.events
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
      text: 'Удаление фильтра затронет информацию о товарах',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да, подтверждаю',
      cancelButtonText: 'Отмена',
      closeOnConfirm: false,
      html: false
    , (isConfirm) ->
      if(isConfirm)
        Meteor.call 'deleteFilter', e.currentTarget.id, (error, res) ->
          if (error)
            handleError(error)
            swal.close()
          else
            swal
              title: 'Удалено',
              text: 'Фильтр удалён',
              type: 'success',
              timer: 1500,
              showConfirmButton: false

