/*globals angular */
(function() {
    'use strict';
    angular.module('bkApp').component('aboutProject', {
        bindings: {
            project: '<'
        },
        templateUrl: 'app/projects/about-project.html'
    });

})();