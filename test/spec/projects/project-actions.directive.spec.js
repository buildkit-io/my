/* global inject expect describe */
describe('projectActionsController', function() {
    beforeEach(module('bkApp'));

    var $controller,
        tasksService;

    beforeEach(module(function($provide) {
        $provide.value('$firebaseArray', {});
        $provide.value('$firebaseObject', {});
    }));

    beforeEach(inject(function(_$controller_, _tasksService_) {
        $controller = _$controller_;
        tasksService = _tasksService_;
    }));
    
    describe('$scope.canStart', function() {
        it('is false unless project is stopped', function() {
            var $scope = {};

            $controller('projectActionsController', {
                $scope: $scope
            });
            expect($scope.canStart).toBeFalsy();
        });
    });
    
    describe('$scope.stopProject', function() {
        it('stops a project', function() {
            var $scope = {};

            $controller('projectActionsController', {
                $scope: $scope
            });
            
            spyOn(tasksService, 'stopProject');
            
            $scope.stopProject();
            
            expect(tasksService.stopProject).toHaveBeenCalled();
        });
    });

});