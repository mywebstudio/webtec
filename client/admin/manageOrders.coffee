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
  this.list2 = new ReactiveVar []


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
        it = Items.findOne(item)
        if it.type != 'regular'
          if newList[item]
            newList[item]++
          else
            newList[item] = 1
      keys = Object.keys(newList)
      for i in keys
        list[y] = {id: i, kol: newList[i] }
        y++
      this.list.set list

      newList = []
      list = []
      i = 0
      y = 0
      for item in order.items
        it = Items.findOne(item)
        if it.type == 'regular'
          if newList[item]
            newList[item]++
          else
            newList[item] = 1
      keys = Object.keys(newList)
      for i in keys
        list[y] = {id: i, kol: newList[i] }
        y++
      this.list2.set list

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

  stoimost: (price, percent, discont, kol) ->
    if discont
      x = price - price * discont * 0.01
      if percent
        return x
      if !kol and !percent
        return x
      if kol and !percent
        return x * kol
    else  
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

  itemsList2: ->
    return Template.instance().list2.get()

  dateshort: (dat) ->
    return moment(dat).format('DD / MMM')

  date: (dat) ->
    return moment(dat).format('LL')

  fromdate: (dat) ->
    return moment(dat).fromNow()


Template.manageOrders.events
  'click .later': (e, t) ->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call 'setOrderActive', FlowRouter.getParam('id'), (err, res) ->
          
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

  'click #bill': (e, t) ->
    send = []
    items = $('.findthis')
    i = 0
    send.push( [ { text: '№', alignment: 'center', bold: true },{ text: 'Наименование товара', alignment: 'center', bold: true },{ text: 'Цена', alignment: 'center', bold: true },{ text: 'Кол-во', alignment: 'center', bold: true },{ text: 'Стоимость', alignment: 'center', bold: true } ]   )
    while i < items.length
      row = []
      row.push(i + 1)
      row.push( $($('.findname')[i]).html().toString() )
      row.push( $($('.findpricegen')[i]).html().trim() )
      row.push( $($('.findkol')[i]).html().toString() )
      row.push( $($('.findpricegen2')[i]).html().trim() )
      send.push( row )
      i++
    sum = $('#sum').html()
    if(!sum)
      sum = $('.heading_b').html() + 'руб.'
    if(!sum)
      sum = ' '
    send.push( [  '', { text: 'Итого:', alignment: 'left', bold: true },'','', { text: sum, alignment: 'left', bold: true }] )

    Meteor.call 'createOrderBill', FlowRouter.getParam('id'), send, (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'
          
  'click .teh': (e, t) ->
    Meteor.call 'createOrderPdf', FlowRouter.getParam('id'), $('#text-tehzadanie').val(), (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'
                    
  'click #compred': (e, t) ->
    Meteor.call 'createOrderCompred', FlowRouter.getParam('id'), $('#text-tehzadanie').val(), (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'
          
  'click #offer': (e, t) ->
    if $('#name').val() and $('#adress').val()
      Meteor.call 'createOrderDoc', FlowRouter.getParam('id'), (err, res) ->
        if res
          pdfMake.createPdf(res).open()
        if err
          UIkit.notification
            message: err,
            status: 'error',
            pos: 'top-right'
    else
      $('#name').addClass('uk-form-danger')
      $('#adress').addClass('uk-form-danger')
      UIkit.notification
        message: 'Пожалуйста, заполните своё ФИО и реквизиты',
        status: 'error',
        pos: 'top-right'

  'change #pname': (e, t) ->    
    Meteor.call 'setOrderName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
          message: 'Название проекта сохранено',
          status: 'primary',
          pos: 'top-right'
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'


          
  'click .regoffer': (e, t) ->
    Meteor.call 'createOrderRegDoc', FlowRouter.getParam('id'), (err, res) ->
      if res
        pdfMake.createPdf(res).open()
      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'


  'click .order': (e, t) ->
    order = OrdersList.findOne(FlowRouter.getParam('id'))
    if order.spec and $('#pname').val() and $('#name').val() and $('#adress').val()
      if order.free
        t.ready.set false
        Meteor.call 'addProject', FlowRouter.getParam('id'), (err, res) ->
          if res
            OrdersList.update FlowRouter.getParam('id'),
              $set:
                _payedAt: new Date
                payed: true
                active: false
  
            #                Meteor.call('sendNewProj', res);
            FlowRouter.go 'dashboard'
          if err
            t.ready.set true
            UIkit.notification
              message: err
              status: 'error'
              pos: 'top-right'
              timeout: 5000
      else
        html = "<p>Нажимая оформить, вы подтверждате, что ознакомились с <a onclick='"+
          '$("#offer").click();'+
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
              t.ready.set false
              Meteor.call 'addProject', FlowRouter.getParam('id'), (err, res) ->
                if res
                  OrdersList.update FlowRouter.getParam('id'),
                    $set:
                      _payedAt: new Date
                      payed: true
                      active: false
  #                Meteor.call('sendNewProj', res);
                  FlowRouter.go 'dashboard'
                if err
                  t.ready.set true
                  UIkit.notification
                    message: err
                    status: 'error'
                    pos: 'top-right'
                    timeout: 5000

    else
      $('#pname').addClass('uk-form-danger')
      $('#name').addClass('uk-form-danger')
      $('#adress').addClass('uk-form-danger')
      $('#specdng').addClass('uk-text-danger')

      UIkit.notification
        message: 'Для продолжения необходимо указать свои ФИО и реквизиты, заполнить спецификацию и название проекта'
        status: 'error'
        pos: 'top-right'
        timeout: 5000

  'change #name': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'setOrderUserName', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
          status: 'primary'
          pos: 'top-right'
          timeout: 5000
      if err
        UIkit.notification
          message: err
          status: 'error'
          pos: 'top-right'
          timeout: 5000


  'change #adress': (e, t) ->
    e.stopPropagation()
    e.preventDefault()
    Meteor.call 'settOrderUserAdress', FlowRouter.getParam('id'), e.currentTarget.value, (err, res) ->
      if res
        UIkit.notification
          message: 'Изменения сохранены!'
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
