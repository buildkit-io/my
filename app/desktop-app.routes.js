/*globals angular */
angular.module("bkApp").config(function($routeProvider) {
    $routeProvider
        .when("/desktop-projects/:hostname/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/desktop-view.html"
        })
        .when("/", {
            controller: 'desktopDashboardController',
            template: ""
        })
        .otherwise({
            redirectTo: '/'
        });
});