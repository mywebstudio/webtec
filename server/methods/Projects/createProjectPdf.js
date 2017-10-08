Meteor.methods({
	createProjectPdf(projectId) {

		
		const project = Projects.findOne(projectId);
		const order = OrdersList.findOne(project.bill[0]);
		if (!project){
			throw new Meteor.Error('error-invalid-name', 'Проект не существует', { method: 'addProject' });
		}

		if (project.user != this.userId && project.manager != this.userId && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-invalid-name', 'Этот счёт уже оформлен', { method: 'addProject' });
		}

		var content = [];
		var tasks = Tasks.find({project: projectId}).fetch();

		for(var i = 0; i < tasks.length; i++){
			var header = {}; header.text = tasks[i].name; header.style = 'header';
			content.push( header );
			content.push( tasks[i].teh );
		}
		

		var pdf = {
			info: {
				title: 'Техническое задание на выполнение информационных услуг компанией WEB TEC',
				author: 'Stuurgurs',
				subject: 'Theme',
				keywords: 'webtec, tecweb.ru, Техническое задание'
			},
			pageSize: 'A4',
			pageOrientation: 'portrait',
			pageMargins: [30, 60, 25, 60],
			styles: {
				header: {
					fontSize: 14,
					alignment: 'center',
					bold: true,
					margin: [30, 20, 30, 20]
				}
			},
			content: [
				{
					text: 'Приложение к договору №000'+order.number+' от '+ moment(project._createdAt).format('DD-MM-YYYY'),
					fontSize: 12,
					bold: true,
					alignment: 'center',
					margin: [30, 0, 30, 10]
				},
				{
					text: 'Техническое задание',
					fontSize: 16,
					bold: true,
					alignment: 'center',
					margin: [30, 30, 30, 30]
				},
				content
			]
		};

		return pdf;
	}
});
