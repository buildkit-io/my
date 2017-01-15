/* global inject expect */
describe('projectsController', function() {
    beforeEach(module('bkApp'));

    var $controller;

    beforeEach(module(function($provide) {
        $provide.value('projectsService', {});
    }));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('$scope.newProject', function() {
        it('calls the Project constructor', function() {
            var $scope = {};

            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.newProject).toBeDefined();
        });
    });
});
