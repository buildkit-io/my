/* global angular Task */
angular.module("bkApp").factory('tasksService', ['firebaseService', function(firebaseService) {
    return {
        getTasks: function(hostname) {
            return firebaseService.getArrayRef('tasks/'+hostname);
        },
        createProject: function(project) {
            var task = new Task(Task.ActionTypes.CREATE, project);
            task.createdAt = firebaseService.getServerTime();
            return task;
        },
        startProject: function(project) {
            var task = new Task(Task.ActionTypes.START, project);
            task.project = {hostname: task.project.hostname};
            task.createdAt = firebaseService.getServerTime();
            return firebaseService.addToArray('tasks/'+project.hostname, task);
        },
        restartProject: function(project) {
            var task = new Task(Task.ActionTypes.RESTART, project);
            task.project = {hostname: task.project.hostname};
            task.createdAt = firebaseService.getServerTime();
            return firebaseService.addToArray('tasks/'+project.hostname, task);
        },
        stopProject: function(project) {
            var task = new Task(Task.ActionTypes.STOP, project);
            task.project = {hostname: task.project.hostname};
            task.createdAt = firebaseService.getServerTime();
            return firebaseService.addToArray('tasks/'+project.hostname, task);
        },
        deleteProject: function(project) {
            var task = new Task(Task.ActionTypes.DELETE, project);
            task.project = {hostname: task.project.hostname};
            task.createdAt = firebaseService.getServerTime();
            return firebaseService.addToArray('tasks/'+project.hostname, task);
        }
        
    };
}]);