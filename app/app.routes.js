/*globals angular */
angular.module("bkApp").config(function($routeProvider) {
    $routeProvider
        .when("/projects/:hostname/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/view.html"
        })
        .when("/tutorials", {
            controller: 'tutorialsController',
            templateUrl: "app/tutorials/view.html"
        })
        .otherwise({
            redirectTo: '/tutorials'
        });
});