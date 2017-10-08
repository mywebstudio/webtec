Meteor.methods({
	setProjectManager(id, value) {

		check(id, String);
		check(value, String);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectManager'});
			}
			if (currentApplication.user != this.userId && currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectManager'});
			}

			Projects.update(id, {
				$set: {
					manager: value
				}
			});

			// Добавляем того же куратора к о всем задачам проекта
			var tasks = Tasks.find({project: id}).fetch();
			for(var i=0; i< tasks.length; i++){
				
				Tasks.update(tasks[i],{
					$set: {
						manager: value
					}
				})
			}
		
			
			return Meteor.call('sendProjectManager', id, value);

	}
});
