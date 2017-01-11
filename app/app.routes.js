angular.module("bkApp").config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/projects/new", {
            controller: 'projectsController',
            templateUrl: "app/projects/new.html",
            headerTitle: 'Projects',
            pageTitle: 'Create a new project',
            activeTab: 'newProject'
        })
        .when("/projects/:hostname/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/view.html",
            headerTitle: 'Projects',
            pageTitle: null
        })
        .otherwise({
            redirectTo: '/projects/new'
        });
});