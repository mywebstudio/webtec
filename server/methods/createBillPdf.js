import moment from 'moment'

Meteor.methods({
	createBillPdf(sum) {


		const project = Projects.findOne({user: this.userId});
		if (!project){
			throw new Meteor.Error( 'У вас ещё нет ни одного проекта для оплаты', { method: 'createBillPdf' });
		}
		
		const order = OrdersList.findOne(project.bill[0]);

		const user = Meteor.users.findOne(this.userId);

		var pdf = {
			info: {
				title: 'Счёт №000'+ order.count +' от '+ moment(order._createdAt).format('DD-MM-YYYY'),
				author: '',
				subject: 'Theme',
				keywords: ''
			},
			pageSize: 'A4',
			pageOrientation: 'portrait',
			pageMargins: [30, 60, 25, 60],
			styles: {
				header: {
					fontSize: 14,
					alignment: 'center',
					bold: true
				}
			},
			content: [
				{
					text: 'Счёт №000'+ order.count +' от '+ moment(order._createdAt).format('DD-MM-YYYY'),
					fontSize: 16,
					bold: true,
					alignment: 'center',
					margin: [30, 10, 30, 40]
				},
				'Исполнитель: ИП Стуу-Ллирргсс Стуургурс Юрьевич | ОГРНИП 316920400077093, ИНН 920455586851, РНКБ (ПАО), Р/с 40802810842560101272, К/с 30101810335100000607, БИК 043510607 | 299055 Севастополь, Хрусталёва 165, 43 Тел: +7(978)074-74-03',
				' ',
				'Заказчик: '+ Meteor.user().name + ' | ' +  Meteor.user().adress + ' | ' + Meteor.user().tel ,
				' ',
				{
					table: {
						// headers are automatically repeated if the table spans over multiple pages
						// you can declare how many rows should be treated as headers
						headerRows: 1,
						widths: [ 'auto', 'auto', 'auto', 'auto'],
						margin: [0, 30, 0, 40],
						body: [
							[ { text: '№', alignment: 'center', bold: true }, { text: 'Наименование платежа', alignment: 'center', bold: true },{ text: 'Единица', alignment: 'center', bold: true },{ text: 'Сумма', alignment: 'center', bold: true }],
							[ { text: '1', alignment: 'center' }, { text: 'Оптала за услуги по созданию и продвижению сайтов ИП Стуу-Ллирргсс С.Ю.', alignment: 'center' },{ text: 'руб', alignment: 'center'},{ text: ' ', alignment: 'center' }],
							[ { text: ' ', alignment: 'center' }, { text: ' ', alignment: 'center'},{ text: ' ', alignment: 'center' }, { text: sum, alignment: 'center', bold: true }]

						]

					}
				},
				' ',
				'Всего наименований 1, на сумму ' + sum + ' руб.'

			],
			fontSize: 8
		};

		return pdf;
	}
});
