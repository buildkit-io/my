(function() {
    'use strict';
    angular.module('bkApp').component('projectContainers', {
        bindings: {
            project: '<'
        },
        templateUrl: 'app/projects/project-containers.html'
    });

})();