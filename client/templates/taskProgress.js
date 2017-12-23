
Template.taskProgress.onCreated(function() {
    this.subscribe('TasksSmart');
});
Template.taskProgress.helpers({
   data(){
       return Template.instance().data.task
   },

    endtasks(id) {
        var task = Tasks.findOne(id);
    var tasksFinished = Tasks.find({project: task.project, labels:  id, status:  1}).fetch();
    return tasksFinished.length
    },

    alltasks(id) {
        var task = Tasks.findOne(id);
        var x = Tasks.find({project: task.project, labels:  id}).fetch();
        return x.length
    }

});