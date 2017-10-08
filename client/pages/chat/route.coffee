
FlowRouter.route '/direct/:id?',
  name: 'chat'
  action: (params) ->
    Session.set 'curSet', 'chat'
    BlazeLayout.render 'main',
      center: 'chat'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      params: params
 
FlowRouter.route '/chatlist',
  name: 'chatList'
  action: () ->
    Session.set 'curSet', 'chat'
    BlazeLayout.render 'main',
      center: 'chatList'
      header: 'header'
      footer: 'footer'


FlowRouter.route '/chatlist/:id?',
  name: 'chatItem'
  action: (params) ->
    Session.set 'curSet', 'chat'
    BlazeLayout.render 'main',
      center: 'chatList'
      header: 'header'
      footer: 'footer'
      params: params