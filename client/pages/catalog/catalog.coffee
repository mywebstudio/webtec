import toastr from 'toastr'

Template.catalog.onCreated ->
    this.subscribe 'catalogItemShortList2'
#    this.subscribe 'MainAction'
    @ready = new ReactiveVar false
    
    @autorun =>
        subscription = this.subscribe 'Sections'
        this.ready.set subscription.ready()

    
Template.catalog.helpers 
    category: ->
        Sections.find({}, {sort: {sort: -1}})

    isAdmin: ->
        if  Meteor.user() and Meteor.user().roles == 'admin'
            return true;

    isReady: ->
        return Template.instance().ready.get()



Template.catalog.events
    'click .edit': (ev, te) ->
        console.log "гажал"
        e.preventDefault()
        e.stopPropagation()
        userData = {}
        userData.name = $('#name-'+e.currentTarget.id).val();
        userData.sort = $('#sort-'+e.currentTarget.id).val();
        userData.active = true;

        Meteor.call 'updateCatalogCategory', e.currentTarget.id, userData, (err, res) ->
            if res
                toastr.success "Раздел отредактирован"
                modal = UIkit.modal("#mod-"+e.currentTarget.id)
                modal.hide()

            if err
                toastr.error handleError(err)

        
    'change .mainImg': (event, template) ->
        files = event.target.files
        file = Images.insert(files[0])
        if file
            Meteor.call 'setCatalogImg', event.currentTarget.id, file._id, (err, res) ->
                if res
                    UIkit.notification
                        message: 'Изменения сохранены!',
                        status: 'primary',
                        pos: 'top-right',
                        timeout: 5000
                if err
                    UIkit.notification
                        message: err
                        status: 'error'
        else
            UIkit.notification
                message: 'Файл не прочитан'
                status: 'error'

        
    'change #mainImg': (event, template) ->
        
        e = event.originalEvent or event
        files = e.target.files
        filesToUpload = []
        for file in files
            filesToUpload.push
                file: file
                name: file.name

            reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = ->

                img = document.createElement("img")
                img.src = reader.result
                img.onload = ->

                    canvas = document.createElement('canvas')
                    MAX_WIDTH = 300
                    MAX_HEIGHT = 220
                    width = img.width
                    height = img.height
                    if width > height
                        if width > MAX_WIDTH
                            height *= MAX_WIDTH / width
                            width = MAX_WIDTH
                    else
                        if height > MAX_HEIGHT
                            width *= MAX_HEIGHT / height
                            height = MAX_HEIGHT
                    canvas.width = width
                    canvas.height = height
                    ctx = canvas.getContext('2d')
                    ctx.drawImage img, 0, 0, width, height
                    Meteor.call 'setCategoryMainImg', event.currentTarget.id, canvas.toDataURL('image/jpeg'), (err, res) ->
                        if res
                            toastr.success "Изменения сохранены"
