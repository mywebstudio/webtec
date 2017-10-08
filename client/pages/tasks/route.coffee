FlowRouter.route '/tasks',
  name: 'task-list'
  action: () ->
    Session.set 'current', 'task'
    BlazeLayout.render 'main',
      center: 'manageTasks'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      


FlowRouter.route '/tasks/:id?',
  name: 'task-item'
  action: (params) ->
    Session.set 'current', 'task'
    BlazeLayout.render 'main',
      center: 'manageTask'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      params: params
