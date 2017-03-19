/*globals angular */
(function() {
    'use strict';

    function TasksController($scope) {
        var ctrl = this;

        ctrl.cancelTask = function(task) {
            ctrl.tasks.$remove(task);
        };
        
        ctrl.getClass = function(task) {
            switch(task.status) {
                case Task.StatusTypes.PENDING:
                    return 'label-warning';
                case Task.StatusTypes.FAILED:
                    return 'label-danger';
                case Task.StatusTypes.IN_PROGRESS:
                    return 'label-info';
                case Task.StatusTypes.DONE:
                    return 'label-success'; 
                default:
                    return 'label-default';
            }
        };
    }

    angular.module('bkApp').component('tasks', {
        bindings: {
            tasks: '<'
        },
        templateUrl: 'app/tasks/tasks.html',
        controller: TasksController
    });

})();