import moment from 'moment';
import toastr from 'toastr' 

Template.manageUsers.onCreated ->
  this.subscribe('userData')

Template.manageUsers.helpers
  isReady: ->
    return Template.instance().ready.get()

  users: -> 
    return Meteor.users.find().fetch()

  email: (userId) ->
    user = Meteor.users.findOne(userId)
    return user.emails[0].address


Template.manageUsers.events

  'change .active': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setActive', e.currentTarget.id, e.currentTarget.checked, (err, res) ->
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

  'keydown #users-filter': (e) ->
    if e.which == 13
      e.stopPropagation()
      e.preventDefault()
    return

  'keyup #users-filter': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    t.filter.set e.currentTarget.value
    return
    
  'click .user-info': (e, instance) ->
    e.preventDefault()
    instance.tabBarData.set Meteor.users.findOne(@_id)
    instance.tabBar.open 'admin-user-info'
    return
  'click .info-tabs button': (e) ->
    e.preventDefault()
    $('.info-tabs button').removeClass 'active'
    $(e.currentTarget).addClass 'active'
    $('.user-info-content').hide()
    $($(e.currentTarget).attr('href')).show()
    return
  'click .load-more': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    t.limit.set t.limit.get() + 50
    return

  'click .save': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    
    userData = {}
    userData.email = s.trim($('#email').val());
    userData.verified = 1;
    userData.password = s.trim($('#password').val());
    userData.username = s.trim($("#username").val());
    userData.name = s.trim($("#name").val());
    userData.roles = ['user'];

    Meteor.call 'insertOrUpdateUser', userData, (err, res) ->
      if res
        toastr.success "Пользователь создан"
        Meteor.call 'setPas', res, userData.password, (err, res) ->
#        Meteor.call 'setRol', res, $('#rol').val(), (err, res) ->
        modal = UIkit.modal("#adduser")
        modal.hide()
        FlowRouter.go('manageusersedit', { id: res } );        
      if err
        toastr.error handleError(err)

  'click .delete': (e, instance) ->
    user = e.currentTarget.id
    if user
      swal
        title: 'Вы уверены?',
        text: 'Удалить пользователя?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Да, подтверждаю',
        cancelButtonText: 'Отмена',
        closeOnConfirm: false,
        html: false
      , (isConfirm) ->
        if(isConfirm)
          Meteor.call 'deleteUser', user, (error) ->
            if (error)
              handleError(error)
              swal.close()
            else
              swal
                title: 'Удалено',
                text: "Пользователь успешно удалён",
                type: 'success',
                timer: 1500,
                showConfirmButton: false

