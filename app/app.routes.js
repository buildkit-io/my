angular.module("bkApp").config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/projects/new", {
            controller: 'projectsController',
            templateUrl: "app/projects/new.html",
            headerTitle: 'Projects',
            pageTitle: 'Create a new project',
            activeTab: 'newProject'
        })
        .when("/projects/:id/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/view.html"
        })
        .otherwise({
            redirectTo: '/projects/new'
        });
});