
Template.projectProgress.helpers({
   data(){
       return Template.instance().data.task
   },

    endtasks(id) {
    var tasks = Tasks.find({project: id}).fetch();
    var tasksFinished = Tasks.find({project: id, status: 1}).fetch();
    return tasksFinished.length
},

alltasks(id) {
    var tasks = Tasks.find({project: id}).fetch();
    return tasks.length
},

tasktimeall (id) {
    var tasks = Tasks.find({project: id}).fetch();
    var count = 0;
    for(var i=0;i<tasks.length; i++){
        if(tasks[i].time)
            count = count + tasks[i].time;
    }
        
    return count
},

tasktimeend (id) {
    var tasks = Tasks.find({project: id}).fetch();
    var count = 0;
    for(var i=0;i<tasks.length; i++) {
        if (tasks[i].status == 1 && tasks[i].time)
            count = count + tasks[i].time;
    }
    return count
}

});