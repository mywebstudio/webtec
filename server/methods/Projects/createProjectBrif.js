Meteor.methods({
	createProjectBrif(projectId, text) {

		
		const project = Projects.findOne(projectId);
		const order = OrdersList.findOne(project.bill[0]);
		if (!project){
			throw new Meteor.Error('error-invalid-name', 'Проект не существует', { method: 'addProject' });
		}

		if (project.user != this.userId && project.manager != this.userId && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-invalid-name', 'Этот счёт уже оформлен', { method: 'addProject' });
		}



		var pdf = {
			info: {
				title: 'Спецификация к проекту - ' + order.name,
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
					text: 'Приложение к договору №000'+order.number+' от '+ moment(order._createdAt).format('DD-MM-YYYY'),
					fontSize: 12,
					bold: true,
					alignment: 'center',
					margin: [30, 0, 30, 10]
				},
				{
					text: 'Спецификация. ' + order.name,
					fontSize: 16,
					bold: true,
					alignment: 'center',
					margin: [30, 30, 30, 30]
				},
				text
			]
		};

		return pdf;
	}
});
