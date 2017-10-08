import toastr from 'toastr'
import scrollIntoView from 'scroll-into-view'

Template.list.onRendered ->
   
    if Session.get('hash')
        Meteor.setTimeout ->
            scrollIntoView(document.querySelector('#'+ Session.get('hash')), {time: 0})
        , 1000

     
Template.list.onCreated ->

    this.subscribe('Sections')
    
    this.limit = new ReactiveVar 10
    this.ready = new ReactiveVar true
    this.subcat = new ReactiveVar true
    this.items = new ReactiveVar
    this.filterIds = new ReactiveVar {}
    this.filterQ = new ReactiveVar false
#    PostSubs.subscribe 'catalogItemShortList', FlowRouter.getParam('category')
        
    @autorun =>
        subscription = this.subscribe 'catalogItemShortList', FlowRouter.getParam('category')
        this.ready.set subscription.ready()

    @items = ->
        sort =
            sort:
                price: 1
                farray: 1
        query = {}
        flag = false
        limit = this.limit.get()

        filters = @filterIds.get()
        if filters
            query = filters

            flag = @filterQ.get()
            if flag
                query.quant1 = {$gt: '0'}
            else
                delete query['quant1']


        query.category = FlowRouter.getParam('category')
        return Items.find(query).fetch()


    @filters = ->
        return FiltersList.find({active: true, category: { $in: ['0', FlowRouter.getParam('category')]}},{sort: {name: 1}}).fetch()

    @autorun =>
        subscription2 = this.subscribe 'FiltersList'
        if subscription2.ready()
            catfilter = FiltersList.findOne({category:  FlowRouter.getParam('category') })
            filters = @filterIds.get()
            if filters['farray.'+catfilter._id]
                this.subcat.set false


Template.list.helpers

    hasMoreThenOneItem: (filterId) ->
        items = Items.find().fetch()
        for item in items
            if item.farray and item.farray[filterId]
                return true

    hasThisItem: (filterId, itemId) ->
        items = Items.find().fetch()
        props = Template.instance().filters()
        for prop in props
            if prop._id == filterId
                for item in items
                    if item.farray and item.farray[filterId] == itemId
                        return true

    isAdmin: ->
        if Meteor.user().roles == 'admin'
            return true

    hasMOre: ->
        if Template.instance().limit.get() < Items.find().fetch().length
            return true

    selected2: ->
        return Template.instance().filterGn.get()

    isSubcat: ->
        return Template.instance().subcat.get()

    isReady: ->
        return Template.instance().ready.get()

    selected: (id, value) ->
        filters = Template.instance().filterIds.get()

        if filters['farray.'+id] == value
            return 'check'
        if !filters['farray.'+id] and value == '11'
            return 'check'

    selected3: (flag1) ->
        flag = Template.instance().filterQ.get()

        if flag == flag1
            return 'check'
        else
            return ''

    title: ->
        data = Sections.findOne({redirectUri: FlowRouter.getParam('category')})
        return data.name

    filterCatId: ->
        filt = FiltersList.findOne({category: FlowRouter.getParam('category')})
        return filt._id

    filterCat: ->
        filt = FiltersList.findOne({category: FlowRouter.getParam('category')})
        return filt.prop

    filters: ->
        return Template.instance().filters()

    items: ->
        return Template.instance().items()
        
    isClient: ->
        Session.get 'isClient'

    curcategory: ->
        return FlowRouter.getParam('category') 

    curcategors: ->
        return Sections.find({active: true})

    selectedCategory: (catalias) ->
        if catalias == FlowRouter.getParam('category')
            return 'check'

Template.list.events
    'click .top': (e, t) ->
        scrollIntoView document.querySelector('#top-of-page')


    'click #showmore': (e, t) ->
        e.preventDefault()
        e.stopPropagation()
        t.limit.set(t.limit.get() + 10)

        
    'click .catclick': (e, t) ->
        t.filterIds.set {}
        t.limit.set 10

    'click .click': (e, t) ->
        if(e.currentTarget.title)
            filt = t.filterIds.get()
            filt['farray.'+e.currentTarget.id] = e.currentTarget.title
            t.filterIds.set filt
        else
            filt = t.filterIds.get()
            delete  filt['farray.'+e.currentTarget.id]
            t.filterIds.set filt

    'click .filtervnalichii': (e, t) ->
        t.filterQ.set true

    'click .filterall': (e, t) ->
        t.filterQ.set false

    'click #all': (e, t) ->
        t.filterGn.set 'all'

    'click #all': (e, t) ->
        t.filterGn.set 'all'

    'click #hit': (e, t) ->
        cur = t.filterGn.get()
        if cur == 'hit'
            t.filterGn.set
        else
            t.filterGn.set 'hit'

    'click #quant': (e, t) ->
        cur = t.filterGn.get()
        if cur == 'quant'
            t.filterGn.set
        else
            t.filterGn.set 'quant'
            

    'click .cart': (e, t) ->
        e.preventDefault()
        e.stopPropagation()
        Meteor.call 'addOrder', e.currentTarget.id, (err, res) ->
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