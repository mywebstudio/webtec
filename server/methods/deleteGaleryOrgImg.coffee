Meteor.methods
  deleteGaleryOrgImg: (key, orgId) ->
    if not Meteor.user.roles == 'admin'
      throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'deleteGaleryOrgImg' }

    currentApplication = Items.findOne(orgId)
    if not currentApplication?
      throw new Meteor.Error 'error-application-not-found', 'Application not found', { method: 'deleteGaleryOrgImg' }

    org = Items.findOne(orgId)
    gallery = org.galleryImg.splice(key,1)

    Items.update orgId,
      $set:
        galleryImg: gallery
