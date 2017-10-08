
Template.title.helpers({
   title(){
       return Template.instance().data.title
   },
   subtitle(){
       return Template.instance().data.subtitle
   },
   item1(){
       return Template.instance().data.item1
   },
   item1name(){
       return Template.instance().data.item1name
   },
   item2(){
       return Template.instance().data.item2
   },
    item2name(){
       return Template.instance().data.item2name
   }
});