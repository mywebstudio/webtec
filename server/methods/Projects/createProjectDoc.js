import moment from 'moment'

Meteor.methods({
	createProjectDoc(projectId) {


		const project = Projects.findOne(projectId);
		if (!project){
			throw new Meteor.Error('error-invalid-name', 'Проект не существует', { method: 'createProjectPdf' });
		}

		if (project.user != this.userId  && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-invalid-name', 'Нет доступа', { method: 'createProjectPdf' });
		}

		const order = OrdersList.findOne(project.bill[0]);

		const user = Meteor.users.findOne(project.user);


		var pdf = {
			info: {
				title: 'Договор на разработку сайта №000'+order.number+' от '+ moment(project._createdAt).format('DD-MM-YYYY'),
				author: 'Stuurgurs',
				subject: 'Theme',
				keywords: 'webtec, tecweb.ru, Договор'
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
					text: 'Договор на разработку сайта №000'+order.number+' от '+ moment(project._createdAt).format('DD-MM-YYYY'),
					fontSize: 16,
					bold: true,
					alignment: 'center',
					margin: [30, 10, 30, 40]
				},
				'Индивидуальный предприниматель Стуу-Ллирргсс Стуургурс Юрьевич, далее именуемый Исполнитель, с одной стороны, и '+ user.name +', далее именуемый Заказчик, с другой стороны, совместно именуемые Стороны, пришли к соглашению и заключили настоящий договор о нижеследующем:',
				{ text: '1. Термины и определения.', style: 'header', margin: [0,30,0,10] },
				'Для целей настоящего договора нижеприведенные термины и определения толкуются следующим образом:',
				{
					// for numbered lists set the ol key
					ol: [
						'Сеть Интернет – совокупность взаимосвязанных сетей передачи данных, основанных на использовании набора протоколов TCP/IP и использующих единое адресное пространство.',
						'Сайт – информация (система веб-страниц), размещенная в информационно-телекоммуникационной сети по определенным сетевым адресам (Uniform Resource Locator - URL), в совокупности с комплексом исключительных прав (на доменные имена, базы данных и программы для электронных вычислительных машин), осуществление которых обеспечивает доступ к такой информации.',
						'Программные модули – программное обеспечение, определяющее управление контентом (наполнением сайта).',
						'Информационные материалы - текстовая, графическая, аудио-, видео- и смешанная информация Заказчика, подлежащая размещению на сайте.',
						'Исходный код – текст компьютерной программы на каком-либо языке программирования.'
					]
				},
				{ text: '2. Предмет договора.', style: 'header', margin: [0,30,0,20] },
				'Для целей настоящего договора нижеприведенные термины и определения толкуются следующим образом:',
				{
					// for numbered lists set the ol key
					ol: [
						'По настоящему договору Исполнитель обязуется по заданию Заказчика разработать программное обеспечение, предназначенное для оформления и размещения в сети Интернет информационных материалов Заказчика (выполнить работу по созданию сайта), а Заказчик обязуется принять результат работы и оплатить его.',
						'Работы, указанные в предыдущем пункте 2.1 настоящего договора, выполняются Исполнителем в соответствии с Техническим заданием, изложенным в Приложении №1',
						'Приложение, указанное в п. 2.2, является неотъемлемой частью настоящего договора.'
					]
				},
				{ text: '3. Права и обязанности сторон.', style: 'header', margin: [0,30,0,20] },
				'Для целей настоящего договора нижеприведенные термины и определения толкуются следующим образом:',
				{
					// for numbered lists set the ol key
					ol: [
						{text: 'Обязанности Исполнителя: ', bold: true },
						'Выполнить работу и передать ее результат Заказчику в обусловленные настоящим договором сроки.',
						'Предоставить Заказчику промежуточные результаты работы для контроля за соблюдением сроков и качества выполненных работ.',
						'Разместить результат работы по в Интернете и передать Заказчику доступы к панели управления хостингом.',
						{text: 'Пожизненно, безвозмездно по требованию Заказчика устранять недостатки и дефекты в работе сайта, если приложение таких работ не выходит за рамки утвержденного сторонами Технического задания.', bold: true},
						{text: 'Исполнитель обязуется внести по одной правке на каждый пункт технического задания, которые выходят за рамки самого технического задания и не были известны заранее. Объем каждой правки не должен сумарно превышать десятую часть пункта технического задания, к которому он имеет отношения по времени и объему работы. Всё что выходит за рамки допустимых правок, Исполнитель выполняет на своё усмотрение.', bold: true},
						'Гарантировать конфиденциальность полученной от Заказчика информации, в том числе пароли доступа в закрытые зоны сайта. Обеспечить возможность смены этих паролей администратором сайта.',
						'Исполнитель не несет ответственности за любые недостатки в работе сайта Заказчика, вызванные причинами, которые находятся вне зоны его контроля (качество каналов доступа в Интернет, качество услуг хостинга, непредусмотренные правилами эксплуатации действия персонала Заказчика, неправомерные действия третьих лиц и т. п.).',
						'Информационная поддержка, написание и наполнение сайта материалами, комплекс работ по поисковой оптимизации, а равно принятию иных мер по продвижению сайта не входит в обязанности Исполнителя, за исключением случаев, когда это явно прописано в техническои задании',
						{text: 'Обязанности Заказчика: ', bold: true },
						'Ознакомится с настоящим договором и техническим заданием к договору',
						'Предоставить Исполнителю в течение 3х рабочих дней с момента подписания договора все необходимые информационные материалы. Всё что не было своевременно предоставлено Заказчиком не попадёт на сайт.',
						'Принимать к рассмотрению представленную Исполнителем по электронной почте или в сети Интернет информацию о выполнении промежуточных этапов работы, предусмотренных Техническим заданием.',
						'Подтвердить в течение 3х рабочих дней с момента получения информации о выполнении промежуточных этапов работы посредством электронного сообщения от уполномоченного лица Заказчика на адрес Исполнителя факт принятия работ.',
						'В случае отказа от принятия работ в течение 3х рабочих дней с момента получения информации о выполнении промежуточных этапов работы предоставить в письменной форме мотивированное обоснование с перечнем недостатков, подлежащих устранению. Перечень уполномоченных лиц Заказчика, имеющих право взаимодействия с Исполнителем, определяется Техническим заданием. При отсутствии уведомлений Заказчика о принятии или об отказе в принятии результатов работы соответствующий этап работ считается выполненным надлежащим образом, а результат - принятым Заказчиком.',
						'Приемка окончательного результата работы оформляется письменным актом.',
						'Оплатить результат работы в порядке, предусмотренном п. 5 настоящего договора.',
						{text: 'Исполнитель вправе: ', bold: true },
						'Выполнить обусловленные настоящим договором работы досрочно.',
						'Менять очередность выполнения задач, указанных в техническом задании.',
						'Выполнять правки сверх предусмотренного данным договором объёмов',
						'С предварительным уведомлением Заказчика приостановить выполнение работ в случае несоблюдение порядка и сроков оплаты, предусмотренных п. 5.2.1 настоящего договора.',
						{text: 'Заказчик вправе: ', bold: true },
						'Контролировать соблюдение сроков и качества работ, не вмешиваясь в деятельность Исполнителя.'
					]
				},
				{ text: '4. Порядок и сроки выполнения работ.', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Общий срок выполнения работ, обусловленных настоящим договором, составляет 30 календарных дней.',
						'Исполнитель приступает к выполнению работ после предоставления Заказчиком всех необходимых информационных материалов.',
						{text: 'По завершению очередного этапа работ, обозначенных в техническим задании, в соотвествии с пунктом 3.14. (при утверждении промежуточного этапа работы) Заказчик производит промежуточную оплату.', bold: true},
						'Исполнитель продолжает выполнять следующий по очереди этап работы. Вышеописанная последовательность повторяется до тех пор, пока все этапы работы будут завершены и оплачены. Очередность выполнения работ может меняться Исполнителем.',
						'По окончании работ Исполнителем подписывается Акт приемки выполненных работ и направляется в двух экземплярах Заказчику.',
						'Заказчик обязан без промедления (но не позднее 3х рабочих дней с момента получения Акта приемки выполненных работ) подписать его и один экземпляр направить обратно Исполнителю.',
						'Услуги оказаны Исполнителем надлежащим образом, если Заказчиком в течение семи дней с момента получения Акта об оказании услуг не предъявлены письменные претензии по полученным от Исполнителя услугам.'
					]
				},
				{ text: '5. Порядок и сроки оплаты.', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Цена работы, подлежащей выполнению по п. 1 настоящего договора, составляет ' + order.count + ' рублей.',
						'Оплата работ осуществляется по факту полного выполнения очередного этапа работы, указанного в техническом задании, в размере стоимости данного этапа работы.',
						'Оптала осуществляется не позднее 3х рабочих дней с момента завершения очередного этапа работы, без предварительной оплаты',
						'В случае, если работа представлет собой повторяющуюся услугу с ежемесечной схемой оплатой, или требует оплаты связанных услуг третьих лиц, например хостинга и домена, оплата осуществляется в режиме полной предоплаты.',
						'Стоимость работы может быть пересмотрена как в меньшую так и в большую сторону, как Исполнителем, так и Заказчиком по совместной договорённости с внесением дополнений в техническое задание.',
						'При расторжении договора по инициативе Заказчика до момента его полного завершения, затраченые средства на выполнение промежуточных этапов работы остаются у Исполнителя.'
					]
				},
				{ text: '6. Гарантийные обязательства', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Исполнитель обязуется пожизненно, безвозмездно по требованию Заказчика устранять недостатки и дефекты в работе сайта, если приложение таких работ не выходит за рамки утвержденного сторонами Технического задания.',
						'Гарантийные обязательства вступают в силу после завершения работ по настоящему договору.',
						'Гарантийные обязательства аннулируются в случае: вмешательства Заказчика (или третьих лиц со стороны Заказчика) в исходный код сайта.',
						'Гарантийные обязательства аннулируются в случае: изменения Заказчиком в одностороннем порядке хостинговой площадки или ее конфигурации на другую, не соответстующую установленым в техническом задании, критерям',
					]
				},
				{ text: '7. Исключительные права', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Права собственности на материалы, размещенные на сайте, принадлежат исключительно Заказчику.',
						'Заказчик имеет право правомерного использования сайта по своему усмотрению в любой форме и любым способом.',
						'Исполнитель оставляет за собой право размещать на сайте Заказчика ссылку с указанием своих координат.',
						'Исполнитель оставляет за собой право правомерного использования исходного кода сайта по своему усмотрению в любой форме и любым способом.',
					]
				},
				{ text: '8. Ответственность сторон', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'За неисполнение, либо ненадлежащее исполнение своих обязательств по настоящему договору стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.',
						'Исполнитель не несет ответственности за содержание материалов, а также лексические и грамматические ошибки, в текстовых материалах, предоставленных Заказчиком и размещенных на сайте. Исполнитель несет ответственность за соответствие содержания материалов, размещенных на сайте, содержанию материалов, предоставленных Заказчиком.',
						'Размер подлежащих взысканию с Исполнителя убытков, ограничен сумой оплаченных Заказчиком работ, неисполнение, либо ненадлежащие исполнение которых повлекло причинение убытков, за исключением случаев, когда иной размер ответственности установлен императивными правовыми нормами законодательства РФ, а также когда обязательства по настоящему договору не исполнялись, либо ненадлежащим образом исполнялись вследствие прямого умысла Исполнителя.',
						'Все вопросы, не урегулированные настоящим договором, разрешаются в соответствии с действующим законодательством РФ.',
					]
				},
				{ text: '9. Разрешение споров', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Стороны устанавливают обязательный досудебный порядок урегулирования споров и разногласий.',
						'Под обязательным досудебным порядком урегулирования спора стороны понимают обязанность стороны, полагающей, что ее права в рамках исполнения настоящего договора нарушены другой стороной, предъявить последней письменную претензию. Сторона, в адрес которой направлена претензия, обязана направить ответ на нее не позднее 7 дней с момента получения претензии.',
						'В случае, если сторонам не удастся разрешить все спорные вопросы в порядке, установленном п. 9.1 настоящего договора, спор, подлежит разрешению в судебном порядке в соответствии с законодательством РФ.',
						'Все вопросы, не урегулированные настоящим договором, разрешаются в соответствии с действующим законодательством РФ.',
					]
				},
				{ text: '10. Форс-мажорные обстоятельства', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Сторона освобождается от ответственности за частичное или полное неисполнение обязательств по настоящему договору, если докажет, что надлежащее исполнение оказалось невозможным вследствие непреодолимой силы, то есть чрезвычайных и непредотвратимых при настоящих условиях обстоятельствах, которые стороны не могли предвидеть и предусмотреть в ходе исполнения настоящего договора.',
						'Исполнитель имеет право перенести сроки выполнения настоящего договора на период, в течение которого будет действовать обстоятельства форс-мажора.',
						'При наступлении форс-мажорных обстоятельств каждая сторона должна без промедления известить о них в письменном виде другую сторону. Извещение должно содержать данные о характере обстоятельств, а также официальные документы, удостоверяющие наличие этих обстоятельств и, по возможности, дающие оценку их влияния на возможность исполнения стороной своих обязательств по настоящему договору.',
					]
				},
				{ text: '11. Срок действия договора, порядок его изменения и расторжения', style: 'header', margin: [0,30,0,20] },
				{
					// for numbered lists set the ol key
					ol: [
						'Договор вступает в силу со дня его подписания сторонами и прекращает свое действие после подписания Акта приемки выполненных работ и полной оплаты стоимости результата работ Заказчиком.',
						'Обязательства, предусмотренные п. 6 настоящего договора, сохраняют свое действие на период установленного гарантийного срока.',
						'Любое изменение, вносимое в настоящий договор, оформляется Дополнительным соглашением, которое является неотъемлемой частью настоящего Договора и должно быть подписано сторонами.',
					]
				}
			],
			fontSize: 8
		};

		return pdf;
	}
});