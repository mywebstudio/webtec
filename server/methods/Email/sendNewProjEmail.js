Meteor.methods({
	sendNewProj(projectId) {


		// check(email, String);
        //
		//
		// if(Meteor.user.emails[0].address != email) {
		// 	throw new Meteor.Error('error-invalid-user', 'Ошибка', { method: 'sendWelcomeEmail' });
		// }

		var project = Projects.findOne(projectId);

		var html =
	'		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
	'	<html xmlns="http://www.w3.org/1999/xhtml" style="font-family:     Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
	'	<head>'+
	'		<meta name="viewport" content="width=device-width" />'+
	'		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
	'		<title>Alerts e.g. approaching your limit</title>'+
	'		<style type="text/css">'+
	'			img {'+
	'			max-width: 100%;'+
	'		}'+
	'			body {'+
	'			-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;'+
	'		}'+
	'			body {'+
	'			background-color: #f6f6f6;'+
	'		}'+
	'			@media only screen and (max-width: 640px) {'+
	'			body {'+
	'			padding: 0 !important;'+
	'		}'+
	'			h1 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h2 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h3 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h4 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h1 {'+
	'			font-size: 22px !important;'+
	'		}'+
	'			h2 {'+
	'			font-size: 18px !important;'+
	'		}'+
	'			h3 {'+
	'			font-size: 16px !important;'+
	'		}'+
	'			.container {'+
	'			padding: 0 !important; width: 100% !important;'+
	'		}'+
	'			.content {'+
	'			padding: 0 !important;'+
	'		}'+
	'			.content-wrap {'+
	'			padding: 10px !important;'+
	'		}'+
	'			.invoice {'+
	'			width: 100% !important;'+
	'		}'+
	'		}'+
	'		</style>'+
	'	</head>'+
	'	<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">'+
	'	<table class="body-wrap" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
	'		<td class="container" width="600" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">'+
	'			<div class="content" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">'+
	'				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #FF9F00; margin: 0; padding: 20px;" align="center" bgcolor="#FF9F00" valign="top">'+
	'				Появился новый проект'+
	'				</td>'+
	'				</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">'+
	'					<table width="100%" cellpadding="0" cellspacing="0" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
	'					<tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'					Только что появился новый проект, который ожидает начала работы. Подборнее в разделе "Проеты".'+
	'					</td>'+
	'					</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'						<a href="https://tecweb.ru/projects/'+
	project._id +
	'" class="btn-primary" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Перейки к проекту</a>'+
	'					</td>'+
	'					</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'						Спасибо за доверие к нашей компании! Дня нас нет ничего невозможного'+
	'					</td>'+
	'					</tr></table></td>'+
	'				</tr></table><div class="footer" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">'+
	'				</body>'+
	'	</html>';
		var html2 =
	'		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
	'	<html xmlns="http://www.w3.org/1999/xhtml" style="font-family:     Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
	'	<head>'+
	'		<meta name="viewport" content="width=device-width" />'+
	'		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
	'		<title>Alerts e.g. approaching your limit</title>'+
	'		<style type="text/css">'+
	'			img {'+
	'			max-width: 100%;'+
	'		}'+
	'			body {'+
	'			-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;'+
	'		}'+
	'			body {'+
	'			background-color: #f6f6f6;'+
	'		}'+
	'			@media only screen and (max-width: 640px) {'+
	'			body {'+
	'			padding: 0 !important;'+
	'		}'+
	'			h1 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h2 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h3 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h4 {'+
	'			font-weight: 800 !important; margin: 20px 0 5px !important;'+
	'		}'+
	'			h1 {'+
	'			font-size: 22px !important;'+
	'		}'+
	'			h2 {'+
	'			font-size: 18px !important;'+
	'		}'+
	'			h3 {'+
	'			font-size: 16px !important;'+
	'		}'+
	'			.container {'+
	'			padding: 0 !important; width: 100% !important;'+
	'		}'+
	'			.content {'+
	'			padding: 0 !important;'+
	'		}'+
	'			.content-wrap {'+
	'			padding: 10px !important;'+
	'		}'+
	'			.invoice {'+
	'			width: 100% !important;'+
	'		}'+
	'		}'+
	'		</style>'+
	'	</head>'+
	'	<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">'+
	'	<table class="body-wrap" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
	'		<td class="container" width="600" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">'+
	'			<div class="content" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">'+
	'				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #FF9F00; margin: 0; padding: 20px;" align="center" bgcolor="#FF9F00" valign="top">'+
	'				Ваш проект поступил в разработку ['+
	project._id +
		']'+
	'				</td>'+
	'				</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">'+
	'					<table width="100%" cellpadding="0" cellspacing="0" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
	'					<tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'					Рады сообщить вам, что ваш проект принят и поступил в разработку. Следуйте дальнейшим инструкциям из электронной почты'+
	'					</td>'+
	'					</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'						<a href="https://tecweb.ru/projects/'+
	project._id +
	'" class="btn-primary" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Перейки к проекту</a>'+
	'					</td>'+
	'					</tr><tr style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
	'						Спасибо за доверие к нашей компании! Дня нас нет ничего невозможного'+
	'					</td>'+
	'					</tr></table></td>'+
	'				</tr></table><div class="footer" style="font-family:    Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">'+
	'				</body>'+
	'	</html>';



		Email.send({
			to: 'stuurgurs@ya.ru',
			from: 'tecweb@yandex.ru',
			subject: 'Создан новый проект ['+ project._id +']',
			html: html
		});

		var email = Meteor.user().emails[0].address;
		var manager = Meteor.users.findOne(Meteor.user().manager);
		var manageremail = manager.emails[0].address;

		// отправляем сообщение клиенту
		Email.send({
			to: email,
			from: 'tecweb@yandex.ru',
			subject: 'Ваш проект поступил в разработку ['+ project._id +']',
			html: html2
		});

		// отправляем сообщение менеджеру
		Email.send({
			to: manageremail,
			from: 'tecweb@yandex.ru',
			subject: 'Создан новый проект ['+ project._id +']',
			html: html
		});
	}
});