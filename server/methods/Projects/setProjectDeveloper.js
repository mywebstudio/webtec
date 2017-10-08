Meteor.methods({
	setProjectDeveloper(id, value) {

		check(id, String);
		check(value, String);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectDeveloper'});
			}
			if (currentApplication.user != this.userId && currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectDeveloper'});
			}

			Projects.update(id, {
				$set: {
					developer: value
				}
			});

			// Добавляем того же куратора кода к о всем задачам проекта
			var tasks = Tasks.find({project: id}).fetch();
			for(var i=0; i< tasks.length; i++){
	
				Tasks.update(tasks[i],{
					$set: {
						developer: value
					}
				})
			}
		
			
		return Meteor.call('sendProjectDeveloper', id, value);
		//return true;
	}
});
