FlowRouter.route '/pays',
  name: 'pays'
  action: () ->
    Session.set 'current', 'pays'
    BlazeLayout.render 'main',
      center: 'pays'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      