/* global inject expect */
describe('projectsController', function() {
    beforeEach(module('bkApp'));

    var $controller,
        $routeParams,
        projectsService,
        tasksService;

    beforeEach(module(function($provide) {
        $provide.value('$firebaseArray', function() {});
        $provide.value('$firebaseAuth', {});
        $provide.value('firebaseService', {
            getChildRef: function() {
                return {};
            }
        });
        $provide.value('userService', {});
    }));

    beforeEach(inject(function(_$controller_, _$routeParams_, _projectsService_, _tasksService_) {
        $controller = _$controller_;
        $routeParams = _$routeParams_;
        projectsService = _projectsService_;
        tasksService = _tasksService_;
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
            mockTasks = [],
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
            spyOn(tasksService, 'getTasks').and.returnValue(mockTasks);
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.project).toEqual(mockProject);
            expect($scope.tasks).toEqual(mockTasks);
            expect(projectsService.getProject).toHaveBeenCalledWith("test");
            expect(tasksService.getTasks).toHaveBeenCalledWith("test");
        });
    });
    
    describe('$scope.getStateStyle', function() {
        it('shows success style for project state OK', function() {
            var $scope = {};
            $scope.project = new Project();
            $scope.project.status = Project.StatusTypes.RUNNING;
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.getStateStyle()).toEqual("fa-circle text-success");
        });
        it('shows danger style for project state ERROR', function() {
            var $scope = {};
            $scope.project = new Project();
            $scope.project.status = Project.StatusTypes.FAILED;
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.getStateStyle()).toEqual("fa-circle text-danger");
        });
        it('shows warning style for project state WARNING', function() {
            var $scope = {};
            $scope.project = new Project();
            $scope.project.status = Project.StatusTypes.STARTING;
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.getStateStyle()).toEqual("fa-circle text-warning");
        });
        it('shows default style for project state UNKNOWN', function() {
            var $scope = {};
            $scope.project = new Project();
            $scope.project.status = Project.StatusTypes.CREATING;
            $controller('projectsController', {
                $scope: $scope
            });
            expect($scope.getStateStyle()).toEqual("fa-circle text-default");
        });
    });

});