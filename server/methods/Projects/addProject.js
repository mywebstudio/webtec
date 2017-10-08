Meteor.methods({
	addProject(oid) {

		const order = OrdersList.findOne(oid);
		if (!order){
			throw new Meteor.Error('error-invalid-name', 'Счёт не существует', { method: 'addProject' });
		}

		if (order && order.payed){
			throw new Meteor.Error('error-invalid-name', 'Этот счёт уже оформлен', { method: 'addProject' });
		}


		if (!order.items.length){
			throw new Meteor.Error('error-invalid-name', 'Заказ пуст', { method: 'addProject' });
		}
		
		// Проверяем положительный баланс пользователя 
		if (Meteor.user().balance < 0){
			throw new Meteor.Error('Недостаточно средств', 'Пополните баланс', { method: 'addProject' });
		}

		//Создаём чат проектв
		var room = {};
		var roomId = RoomsList.insert(room);

		

		var project = {};
		project.name = 'Новый проект';
		project.room = roomId;
		project.status = 'Ожидаем предоплату';
		project.progress = 1;
		project.short = 'Дополнительное описание';
		project.brif = ''+
'			<h2><em>Корпоративная информация</em></h2>'+
'			<table border="1" cellspacing="0">'+
'			<tbody>'+
'			<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'			<p>Полное название компании</p>'+
'		</td>'+
'		<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'			<p>&nbsp;</p>'+
'	</td>'+
'	</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Сокращенное название</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Год создания компании</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Руководитель компании, имеющий право подписи (ФИО, должность, контакты)</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Руководящий состав (имена / контакты)</p>'+
'				<ol>'+
'					<li>Директор(а)</li>'+
'					<li>Руководители отделов</li>'+
'					</ol>'+
'					</td>'+
'					<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'					<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Контактные лица (имена / контакты)</p>'+
'				<ol>'+
'					<li>Ответственный за сайт</li>'+
'				<li>Кто заполняет данный бриф</li>'+
'					</ol>'+
'					</td>'+
'					<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'					<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Общее число сотрудников</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Компетентность сотрудников (сертификация, награды, ученая степень)</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Награды, достижения компании, дипломы о выставках и т.п.</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Телефон(ы)</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Адрес(а)</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>E-mail, веб-сайт, домен</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Банковские реквизиты</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'		<tr>'+
'			<td style="height:14.2pt; vertical-align:top; width:205.3pt">'+
'				<p>Как к вам проехать</p>'+
'			</td>'+
'			<td style="height:14.2pt; vertical-align:top; width:172.0pt">'+
'				<p>&nbsp;</p>'+
'			</td>'+
'		</tr>'+
'	</tbody>'+
'	</table>'+
''+
'		<h2><em>Информация о брэнде</em></h2>'+
''+
'		<table border="1" cellspacing="0">'+
'			<tbody>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:182.65pt">'+
'					<p>Наличие зарегистрированного товарного знака (название, год регистрации, наличие логотипа в векторном формате)</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:203.0pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:182.65pt">'+
'					<p>Наличие корпоративных стандартов оформления рекламно-информационной продукции (товарный знак, фирменные цвета, шрифт, модульная сетка, и т.п.) BrandBook или StyleGuide</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:203.0pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:182.65pt">'+
'					<p>Слоган компании</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:203.0pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:182.65pt">'+
'					<p>Миссия</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:203.0pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:182.65pt">'+
'					<p>Цели и задачи</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:203.0pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			</tbody>'+
'		</table>'+
''+
'		<h2><em>Расширенная информация о компании и услугах</em></h2>'+
''+
'		<table border="1" cellspacing="0">'+
'			<tbody>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Виды деятельности (список в порядке важности)</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Основной вид деятельности</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Опишите бизнес-модель компании</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Опишите структуру компании</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Как часто меняется структура компании</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>География ваших услуг (как часто, и в каких городах вы оказываете свои услуги)</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Что представляет собой рекламируемый товар/услуга?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Как используется товар/услуга?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Какие потребности удовлетворяет товар/услуга?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Какие есть особенности в рекламируемых товарах/услугах?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Как организована дистрибуция товара/услуги?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Опишите целевую аудиторию потребителей товара/услуги</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Опишите ключевые стимулы для приобретения продукции для целевой аудитории</p>'+

'					<ol>'+
'						<li>Более низкая цена</li>'+
'						<li>Гибкое ценообразование</li>'+
'						<li>Рекламные акции</li>'+
'						<li>Престиж бренда</li>'+
'						<li>Более высокое качество услуг</li>'+
'						<li>Более высокое качество сервиса</li>'+
'						<li>Иное (опишите)</li>'+
'						</ol>'+
'						</td>'+
'						<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'						<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Формы оплаты</p>'+
'					<ol>'+
'						<li>Наличный расчет</li>'+
'						<li>Безналичный расчет</li>'+
'						<li>Кредитная карта</li>'+
'						</ol>'+
'						</td>'+
'						<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'						<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Основные партнеры</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Бенчмаркинг.</p>'+
'					<ol>'+
'						<li>Основные конкуренты и иностранные компании.</li>'+
'					<li>Их сильные и слабые стороны.</li>'+
'						</ol>'+
'						</td>'+
'						<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'						<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Основные черты, отличающие компанию от конкурентов (гордость компании)</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Сильные и слабые стороны компании</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:183.65pt">'+
'					<p>Какие текущие маркетинговые программы в Интернете проводят конкуренты? Успешны ли они и почему?</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:202.05pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			</tbody>'+
'		</table>'+
'		<h2><em>Информация по сайту</em></h2>'+
'		<table border="1" cellspacing="0">'+
'			<tbody>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Предполагаемое название сайта (краткое название, предполагаемое или существующее имя домена)</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Какова маркетинговая интерактивная стратегия сайта</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Задачи сайта</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Целевая аудитория сайта</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Имидж сайта. Опишите основную идею, которую должен передавать ваш сайт, ожидаемые впечатления и реакцию посетителей в результате его посещения</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Предполагаемая структура сайта.</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td style="height:14.2pt; vertical-align:top; width:184.5pt">'+
'					<p>Пожелания относительно визуального оформления сайта, укажите сайты на которые, по вашему мнению, разработчику нужно обратить внимание</p>'+
'				</td>'+
'				<td style="height:14.2pt; vertical-align:top; width:199.95pt">'+
'					<p>&nbsp;</p>'+
'				</td>'+
'			</tr>'+
'			</tbody>'+
'		</table>';

		var admin = Meteor.users.findOne({roles: 'admin'});
		const colors = [ '#9b59b6', '#16a085', '#2980b9', '#e67e22', '#2980b9', '#27ae60', '#e67e22', '#e74c3c',  '#16a085',  '#9b59b6', '#2980b9'];
		project.bill = [oid];
		project.items = order.items;
		project.user = this.userId;
		project.manager = admin.manager;
		project._createdAt = new Date;
		project.deadline = moment().add(30, 'days');

		const id = Projects.insert(project);

		//Создаём задачи
		for(var i = 0; i < order.items.length; i++){
			var item = Items.findOne(order.items[i]);
			var task = {};
			var cat = Sections.findOne({redirectUri: item.category});

			task.user = this.userId;
			task.title = item.name;
			task.project = id;
			task.order = i;
			task.start = moment().format('MM/DD/YYYY');
			task.end = moment().add(5, 'days').format('MM/DD/YYYY');
			task.manager = project.manager;			
			task.devstatus = 0;
			task.desstatus = 0;
			task.color = colors[cat.sort];
			task.finished = false;
			task.teh = item.teh;
			task.sum = item.price;
			task._createdAt = new Date;
			Tasks.insert(task);
		}
		
		return id;
	}
});
