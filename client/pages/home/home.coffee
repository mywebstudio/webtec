
Template.home.onCreated ->
    this.subscribe 'Filters'
    @ready = new ReactiveVar false
    this.filter = new ReactiveVar('')
    escapeRegExp = require('lodash.escaperegexp')
      
    @autorun =>
        subscription = this.subscribe 'ItemsCatalog'
        subscription2 = this.subscribe 'Sections'
        if subscription.ready() and subscription2.ready()
            this.ready.set true


    @autorun =>
        subscription = this.subscribe 'ItemsCatalog'
        subscription2 = this.subscribe 'Sections'
        if subscription.ready() and subscription2.ready()
            this.ready.set true

            
    this.items = ->
        filter = undefined
        query = undefined
        if this.filter and this.filter.get()
            filter = this.filter.get()
        if filter
            filterReg = new RegExp(escapeRegExp(filter), 'i')
            query =
                $or: [ { text: filterReg }, { name: filterReg }, { short: filterReg }]
                type: {$ne: 'radio'}
        else
            query = {}    
        Items.find(query).fetch()

Template.home.onRendered ->
    Meteor.setTimeout =>
        $('#slider1').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    , 300

    @autorun =>
        if !Meteor.user().free
            freeitems = Items.find({category: "besplatno"}).fetch()
            for free in freeitems
                if Session.get('ordered-'+free._id, true)
                    order = []
                    order.push(free._id)
                    
                    Meteor.call 'setCurOrder', order, (err, res) ->
                        if res
                            Meteor.call 'setUserFree', (err, res) ->
                    
            
    @autorun =>
        if Meteor.user()
            subs= this.subscribe 'Orders'
            if subs.ready()
                
                Meteor.setTimeout =>
                    order = OrdersList.findOne({active: true, user: Meteor.userId()})
                    for item in order.items
                        itemObj = Items.findOne(item)
                        section = Sections.findOne({redirectUri: itemObj.category})

                        if itemObj.type == 'radio'
                            Session.set 'ordered-'+item, true
                            Session.set 'section-ordered-'+section._id, true
                        else if itemObj.type == 'quant'
                            Session.set 'ordered-'+item, true
                            inc = $('input#'+item).val()
                            $('input#'+item).val(inc +1)
                        else
                            Session.set 'ordered-'+item, true
                , 1500


Template.home.helpers
    smartprice: (price) ->
        if Meteor.user() and Meteor.user().discont
            x = price - price * Meteor.user().discont * 0.01
            return x.toFixed()
        else return price

    search: ->
        return Template.instance().items()

    category: ->
        Sections.find({active: true, redirectUri: {$ne: 'besplatno'}}, {sort: {sort: -1}})

    othercategory: ->
        Items.find({category: "prochee", type: {$ne: 'radio'}}, {sort: {sort: 1}})

    freecategory: ->
        Items.find({category: "besplatno"}, {sort: {sort: -1}})

    filters: ->
        FiltersList.find({}, {sort: {price: 1}})

    itemslist: ->
        return Items.find({}, {sort: {sort: 1}})

    raadioitems: (section) ->
        return Items.find({category: section, type: 'radio'}, {sort: {sort: -1, featured: -1}})

    neraadioitems: (section) ->
        return Items.find({category: section, type: {$ne: 'radio'}}, {sort: {sort: -1, featured: -1}})

    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;

    isReady: ->
        return Template.instance().ready.get()

    state: (id) ->
        if Session.get('ordered-'+ id)
            return 'uk-card-primary'

    radiostate: (sid) ->
            if Session.get('section-ordered-'+sid)
                return 'uk-card-secondary'
            else
                return ''

    filterstate: (id) ->
        if Session.get('filter-ordered-'+ id)
            return 'uk-card-primary2 uk-light'
        else
            return ''

    quntamaunt: (id) ->
        if Session.get('ordered-'+ id)
            order = OrdersList.findOne({active: true})
            count = 0;
            for item in order.items
                if item == id
                    count++
            return count
        else return 1


    order: ->
        return OrdersList.findOne({active: true})



Template.home.events
    'click .loginlink': (ev, te) ->
        ev.preventDefault()
        ev.stopPropagation()
        FlowRouter.go('login')

    'click .orderfree': (ev, te) ->
        ev.preventDefault()
        ev.stopPropagation()

        swal
            title: 'Подтверждение',
            text: 'Для продолжения необходимо зарегистрироваться',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Зарегистрироваться',
            cancelButtonText: 'Отмена',
            closeOnConfirm: true,
            html: false
        , (isConfirm) ->
            if(isConfirm)
                Session.set 'ordered-'+ev.currentTarget.id, true
                FlowRouter.go('login')
                

    'click .order': (ev, te) ->
        ev.preventDefault()
        ev.stopPropagation()
        Session.set 'ordered-'+ev.currentTarget.id, !Session.get('ordered-'+ev.currentTarget.id)


    'click .rorder': (ev, te) ->
        ev.preventDefault()
        ev.stopPropagation()
        Session.set 'tour2', true
        if Session.get('ordered-'+ev.currentTarget.id)
            Session.set 'section-ordered-'+ev.currentTarget.name, !Session.get('section-ordered-'+ev.currentTarget.name)
            Session.set 'ordered-'+ev.currentTarget.id, !Session.get('ordered-'+ev.currentTarget.id)
        else
            Session.set 'ordered-'+ev.currentTarget.id, !Session.get('ordered-'+ev.currentTarget.id)

    'keyup #users-filter': (e, t) ->
        e.stopPropagation()
        e.preventDefault()
        t.filter.set e.currentTarget.value
        Session.set 'search', true
        return

    'click .desearch': (ev, te) ->
        Session.set 'search', false

    'click .goorder': (ev, te) ->
        FlowRouter.go 'manageorders', {id: ev.currentTarget.id}

    'click .delorder': (ev, te) ->
        order = OrdersList.findOne(ev.currentTarget.id)
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

        Meteor.call 'deleteOrder', ev.currentTarget.id, (err, res) ->
            if res
                UIkit.scroll($(ev)).scrollTo($("#my-id"));
                UIkit.notification
                    message: "Заказ сброшен"
                    status: 'error'
                    pos: 'top-right'
                    timeout: 5000
            if err
                UIkit.notification
                    message: err
                    status: 'error'
                    pos: 'top-right'
                    timeout: 5000

    'click #refresh': (ev, te) ->
        Session.set 'search', false

    'click .radioorder': (ev, te) ->
        ev.preventDefault()
        ev.stopPropagation()
        Session.set 'section-ordered-'+ev.currentTarget.name, !Session.get('section-ordered-'+ev.currentTarget.name)

    'click .card': (ev, te) ->
#        Убираем выделение пресетов при изменении конфига
        filters = FiltersList.find().fetch()
        for filter in filters
            Session.set 'filter-ordered-'+filter._id, false
        Session.set 'filter-ordered-'+ev.currentTarget.id, !Session.get('filter-ordered-'+ev.currentTarget.id)

        items = Items.find().fetch()

        order = []
        for item in items
            if (Session.get('ordered-'+item._id))
                if(item.type == 'quant')
                    i = 0
                    col = $('input#'+item._id).val()
                    while i < col
                        order.push(item._id)
                        i++
                else
                    order.push(item._id)
        Meteor.call 'setCurOrder', order, (err, res) ->
            if res
                UIkit.notification
                    message: 'Изменения сохранены!',
                    status: 'primary',
                    pos: 'top-right'


    'change .col': (ev, te) ->
#        Убираем выделение пресетов при изменении конфига
        filters = FiltersList.find().fetch()
        for filter in filters
            Session.set 'filter-ordered-'+filter._id, false
        Session.set 'filter-ordered-'+ev.currentTarget.id, !Session.get('filter-ordered-'+ev.currentTarget.id)

        Session.set 'ordered-'+ev.currentTarget.id, true
        items = Items.find().fetch()
        order = []
        for item in items

            if (Session.get('ordered-'+item._id))
                if(item.type == 'quant' and item._id != ev.currentTarget.id)
                    i = 0
                    col = $('input#'+item._id).val()
                    while i < col
                        order.push(item._id)
                        i++
                else if(item.type == 'quant' and item._id == ev.currentTarget.id)
                    i = 0
                    col =  ev.currentTarget.value
                    while i < col
                        order.push(item._id)
                        i++
                else if(item._id != ev.currentTarget.id)
                    order.push(item._id)

        Meteor.call 'setCurOrder', order, (err, res) ->
            if res
                UIkit.notification
                    message: 'Изменения сохранены!',
                    status: 'primary',
                    pos: 'top-right'

    'click .selectfilter': (ev, te) ->
#        Убираем выделение пресетов при изменении конфига
        Session.set 'tour2', true
        filters = FiltersList.find().fetch()
        for filter in filters
            Session.set 'filter-ordered-'+filter._id, false
        Session.set 'filter-ordered-'+ev.currentTarget.id, !Session.get('filter-ordered-'+ev.currentTarget.id)
        #Убираем выделенные конфиги
        items = Items.find().fetch()
        for item in items
            section = Sections.findOne({redirectUri: item.category})
            if section.radio
                Session.set 'ordered-'+item._id, false
                Session.set 'section-ordered-'+section._id, false
            else
                Session.set 'ordered-'+item._id, false

        Meteor.call 'setCurOrder', [], (err, res) ->

#        Выставляем новый конфиг
        f = FiltersList.findOne(ev.currentTarget.id)
        items2 = f.items
        if items2
            for item in items2
                itemObj = Items.findOne(item)
                if itemObj
                    section = Sections.findOne({redirectUri: itemObj.category})
                    if itemObj.type == 'radio'
                        Session.set 'ordered-'+item, true
                        Session.set 'section-ordered-'+section._id, true
                    else
                    Session.set 'ordered-'+item, true
        order = []
        for item in items
            if (Session.get('ordered-'+item._id))
                if(item.type == 'quant')
                    order.push(item._id)
                    $('input#'+item._id).val(1)
                else
                    order.push(item._id)

        Meteor.call 'setCurOrder', order, (err, res) ->
