/*globals angular */
(function() {
    'use strict';
    angular.module('bkApp').component('projectDoc', {
        bindings: {
            project: '<'
        },
        templateUrl: 'app/projects/project-doc.html'
    });

})();