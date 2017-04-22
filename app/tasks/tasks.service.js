/* global angular Task */
/*eslint-env browser */
angular.module("bkApp").factory('tasksService', ['firebaseService', function(firebaseService) {
    var addTask = function(task) {
        var mergedUpdate = {};
        var taskId = firebaseService.getId();
        task.createdAt = firebaseService.getServerTime();
        if (task.action !== Task.ActionTypes.DELETE) {
       		mergedUpdate['projects/' + task.project.hostname + '/tasks/'+taskId] = task;
   		}
        mergedUpdate['tasks/' + taskId] = task;
        firebaseService.update(mergedUpdate).then(function() {
            console.log('Create task.');
        }).catch (function(error) {
            console.log('Failed to create task.');
            console.log(error);
        });
    };
    
    return {
        createProject: function(project, email, cloudformation) {
        	var task = new Task(Task.ActionTypes.CREATE, project);
        	task.cloudformation = cloudformation;
        	task.email = email;
            addTask(task);
        },
        startProject: function(project) {
            addTask(new Task(Task.ActionTypes.START, project));
        },
        restartProject: function(project) {
            addTask(new Task(Task.ActionTypes.RESTART, project));
        },
        stopProject: function(project) {
            addTask(new Task(Task.ActionTypes.STOP, project));
        },
        deleteProject: function(project) {
            addTask(new Task(Task.ActionTypes.DELETE, project));
        },
        listContainers: function(project) {
        	addTask(new Task(Task.ActionTypes.DOCKER_PS, project));
        }  
    };
}]);