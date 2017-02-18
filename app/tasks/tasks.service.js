/* global angular Task */
angular.module("bkApp").factory('tasksService', [function() {
    return {
        createProject: function(project) {
            return new Task(Task.ActionTypes.CREATE, project);
        }
    };
}]);