import moment from 'moment'
moment.locale('ru');

Template.created.helpers({
   out(){
       return moment(Template.instance().data.date).format('DD-MM-YYYY')
   } 
});