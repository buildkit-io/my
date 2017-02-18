/* global inject expect */
describe('projectsController', function() {
    beforeEach(module('bkApp'));

    var $controller,
        $routeParams,
    projectsService;

    beforeEach(module(function($provide) {
        $provide.value('$firebaseArray', function() {});
        $provide.value('$firebaseAuth', {});
        $provide.value('firebaseService', {
            getChildRef: function() {
                return {};
            }
        });
        $provide.value('userService', {});
        $provide.value('tasksService', {});
    }));

    beforeEach(inject(function(_$controller_, _$routeParams_, _projectsService_) {
        $controller = _$controller_;
        $routeParams = _$routeParams_;
        projectsService = _projectsService_;
    }));


    describe('$scope.project', function() {
        it('calls the Project constructor', function() {
            var $scope = {};

            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.project).toBeDefined();
        });

        it('loads existing project', function() {
            var $scope = {},
            mockProject = {},
            projectPromise = {
                then: function(fn) {
                    fn(mockProject);
                    return {
                        catch: function(){}
                    };
                }
            };
            $routeParams.hostname = "test";
            spyOn(projectsService, 'getProject').and.returnValue(projectPromise);
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.project).toEqual(mockProject);
            expect(projectsService.getProject).toHaveBeenCalledWith("test");
        });
    });

});
