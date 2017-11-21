import moment from 'moment'

Meteor.methods({
	createOrderBill(orderId, send) {
		
		const order = OrdersList.findOne(orderId);
		if (!order){
			throw new Meteor.Error('error-invalid-name', 'Проект не существует', { method: 'createProjectPdf' });
		}

		if (order.user != this.userId  && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-invalid-name', 'Нет доступа', { method: 'createProjectPdf' });
		}

		var items = {};

		for(i=0;i<order.items.length;i++){
			var item = order.items[i];

		}


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
					text: 'Счёт №000'+ order.number +' от '+ moment(order._createdAt).format('DD-MM-YYYY'),
					fontSize: 16,
					bold: true,
					alignment: 'center',
					margin: [30, 10, 30, 40]
				},
				'Заказчик: '+ Meteor.user().name + ' ' + Meteor.user().adress,
				' ',
				'Исполнитель: ИП Стуу-Ллирргсс Стуургурс Юрьевич, ОГРНИП 316920400077093, ИНН 920455586851, РНКБ (ПАО), Р\с 40802810842560101272, К\с 30101810335100000607, БИК 043510607',
				' ',
				{
					table: {
						// headers are automatically repeated if the table spans over multiple pages
						// you can declare how many rows should be treated as headers
						headerRows: 1,
						widths: [ 'auto', 'auto', 'auto', 'auto', 'auto' ],
						margin: [0, 30, 0, 40],
						body: send
					}
				}
			],
			fontSize: 8
		};



		return pdf;
	}
});
