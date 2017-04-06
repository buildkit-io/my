angular.module("bkApp").config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/projects/:hostname/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/view.html",
            isProject: true,
            pageTitle: null
        })
        .when("/tutorials", {
            controller: 'tutorialsController',
            templateUrl: "app/tutorials/view.html",
            activeTab: 'tutorials'
        })
        .otherwise({
            redirectTo: '/tutorials'
        });
});