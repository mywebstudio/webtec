import moment from 'moment'
require('pdfmake/build/pdfmake.js')
require('pdfmake/build/vfs_fonts.js')


Template.buyername.onCreated ->
  this.subscribe 'managerShortInfo', Meteor.user().manager

Template.buyername.helpers
  data: ->
    return Meteor.users.findOne(Template.instance().data.user)

Template.buyeradress.onCreated ->

  this.subscribe 'managerShortInfo', Meteor.user().manager

Template.buyeradress.helpers
  data: ->
    return Meteor.users.findOne(Template.instance().data.user)
    
Template.manageOrders.onRendered ->
  Meteor.setTimeout =>
    if !Meteor.user().tour3
      $('#tour3').crumble()
      Meteor.call('turnUserTour3')
  ,3000



Template.manageOrders.onCreated ->
  this.subscribe 'Sections'
  this.subscribe 'Filters'
#  this.subscribe 'OrdersUserAllList'
  this.subscribe 'ItemsOrder', FlowRouter.getParam('id')

  this.ready = new ReactiveVar true
  this.list = new ReactiveVar []

  @autorun =>
    subscription = this.subscribe 'OrdersUserList', FlowRouter.getParam('id')
    if subscription.ready()
      this.ready.set true

      order = OrdersList.findOne(FlowRouter.getParam('id'))
      newList = []
      list = []
      i = 0
      y = 0
      for item in order.items
        if newList[item]
          newList[item]++
        else
          newList[item] = 1
      keys = Object.keys(newList)
      for i in keys
        list[y] = {id: i, kol: newList[i] }
        y++
      this.list.set list

  @orders = ->
    return OrdersList.find({},{sort: {active: -1, _createdAt: -1}})

  @order = ->
    return OrdersList.findOne(FlowRouter.getParam('id'))


  
Template.manageOrders.helpers
  isAdmin: ->    
    if Meteor.user() and Meteor.user().roles == "admin"
      return true

  isReady: ->
    return Template.instance().ready.get()

  orderId: ->
    return FlowRouter.getParam('id')
    
  orders: ->
    return Template.instance().orders()

  order: ->
    return Template.instance().order()

  tableNumber: (num) ->
    return Number(num) + 1

  stoimost: (price, percent, kol) ->
    if percent
      return price
    if !kol and !percent
      return price
    if kol and !percent
      return price * kol
 
  smartprice: (price) ->
    if Meteor.user() and Meteor.user().discont
      x = price - price * Meteor.user().discont * 0.01
      return x.toFixed()
    else return price
      
  namagerId: () ->
    return Meteor.user().manager

  manager: () ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      return Meteor.user()
    else if Meteor.user().roles == 'user'
      return Meteor.users.findOne(Meteor.user().manager)

  item: (id) ->
    return Items.findOne(id)

  itemsList: ->
    return Template.instance().list.get()

  dateshort: (dat) ->
    return moment(dat).format('DD / MMM')

  date: (dat) ->
    return moment(dat).format('LL')

  fromdate: (dat) ->
    return moment(dat).fromNow()


Template.manageOrders.events
  'click .plus': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'setOrderItemDuble', e.currentTarget.id, FlowRouter.getParam('id'), (err, res) ->
      if res
        UIkit.notification
          message: "Товар добавлен"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000
        
  'click .minus': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'setOrderItemMinus', e.currentTarget.id, FlowRouter.getParam('id'), (err, res) ->
      if res
        UIkit.notification
          message: "Товар убран"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'click .delete': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Session.set 'ordered-'+e.currentTarget.id, false
    Meteor.call 'setOrderItemDelete', e.currentTarget.id, FlowRouter.getParam('id'),  (err, res) ->
      if res
        UIkit.notification
          message: "Товар убран из заказа"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'click .teh': (e, t) ->
    Meteor.call 'createOrderPdf', FlowRouter.getParam('id'), (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'
          
  'click .offer': (e, t) ->
    Meteor.call 'createOrderDoc', FlowRouter.getParam('id'), (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'


  'click .order': (e, t) ->
    html = "<p>Нажимая оформить, вы подтверждате, что ознакомились с <a onclick='"+
      '$("#dogovor").click();'+
      "'>договором</a> и <a onclick='"+
      '$("#teze").click();'+
      "'>техническим заданием</a> и принимаете их условия.</p> "
    swal
      title: 'Внимание',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Оформить',
      cancelButtonText: 'Отмена',
      closeOnConfirm: true,
      html: html
    , (isConfirm) ->
        if isConfirm
          Meteor.call 'addProject', FlowRouter.getParam('id'), (err, res) ->
            if res
              OrdersList.update FlowRouter.getParam('id'),
                $set:
                  _payedAt: new Date
                  payed: true
                  active: false
              Meteor.call('sendNewProj', res);
              FlowRouter.go 'manageProject', {id: res}
            if err
              UIkit.notification
                message: err
                status: 'error'
                pos: 'top-right'
                timeout: 5000
    
  'chage .techred': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'replaceOrderItem', FlowRouter.getParam('id'), e.currentTarget.id, $('#text-'+e.currentTarget.id).val(),  (err, res) ->
#    Meteor.call 'setOrderConfirmation', FlowRouter.getParam('id'),  (err, res) ->
      if res
        UIkit.notification
          message: "Пункт отправлен на согласование"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000
    
  'click .payed': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    order = OrdersList.findOne(FlowRouter.getParam('id'))
    filters = FiltersList.find().fetch()
    for filter in filters
      Session.set 'filter-ordered-'+filter._id, false
    for item in order.items
      itemObj = Items.findOne(item)
      if itemObj
        section = Sections.findOne({redirectUri: itemObj.category})
        if itemObj.type == 'radio'
          Session.set 'ordered-'+item, false
          Session.set 'section-ordered-'+section._id, false
        else
          Session.set 'ordered-'+item, false
          
    Meteor.call 'updateOrderPayed', FlowRouter.getParam('id'), Number(Template.instance().sumOpt()), html_to_print, (err, res) ->
      if res
        UIkit.notification
          message: "Заказ оформлен и закрыт"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
        FlowRouter.go 'catalog'
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'click .neo': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'addOrderDuble', e.currentTarget.id, (err, res) ->
      if res
        UIkit.notification
          message: "Заказ продублирован или перенесён"
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000

  'click .del': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    swal
      title: 'Вы уверены?',
      text: 'Вы уверены что хотите удалить заказ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Да',
      cancelButtonText: 'Отмена',
      closeOnConfirm: true,
      html: false
    ,(isConfirm) ->
      if(isConfirm)
        order = OrdersList.findOne(FlowRouter.getParam('id'))
        filters = FiltersList.find().fetch()
        for filter in filters
          Session.set 'filter-ordered-'+filter._id, false
        for item in order.items
          itemObj = Items.findOne(item)
          if itemObj
            section = Sections.findOne({redirectUri: itemObj.category})
            if itemObj.type == 'radio'
              Session.set 'ordered-'+item, false
              Session.set 'section-ordered-'+section._id, false
            else
              Session.set 'ordered-'+item, false

        Meteor.call 'deleteOrder', FlowRouter.getParam('id'), (err, res) ->
          if res
            FlowRouter.go('home')
            UIkit.notification
              message: "Заказ удалён"
              status: 'success'
              pos: 'top-right'
              timeout: 5000
          if err
            UIkit.notification
              message: err
              status: 'error'
              pos: 'top-right'
              timeout: 5000
