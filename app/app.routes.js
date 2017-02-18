angular.module("bkApp").config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/projects/new", {
            controller: 'projectsController',
            templateUrl: "app/projects/new.html",
            activeTab: 'newProject'
        })
        .when("/projects/:hostname/view", {
            controller: 'projectsController',
            templateUrl: "app/projects/view.html",
            isProject: true,
            pageTitle: null
        })
        .when("/market", {
            controller: 'marketController',
            templateUrl: "app/market/view.html",
            activeTab: 'buildkitMarket'
        })
        .otherwise({
            redirectTo: '/market'
        });
});