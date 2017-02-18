/* global expect inject firebase */
describe("Projects Service", function() {
    var projectsService,
    userService,
    $q,
    firebaseService = {
        getChildRef: function() {}
    };

    beforeEach(module("bkApp"));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function($provide) {
        $provide.value('$location', {});
        $provide.value('firebaseService', firebaseService);
        $provide.value('$firebaseAuth', function() {});
        $provide.value('$firebaseArray', function(data) {
            return {
                $loaded: function() {
                    return {
                        then: function(fn) {
                            fn(data);
                            return {
                                catch: function() {}
                            };
                        }
                    };
                },
                $watch: function() {}
            };
        });
    }));

    beforeEach(inject(function(_$q_, _projectsService_, _userService_) {
        $q = _$q_;
        projectsService = _projectsService_;
        userService = _userService_;
    }));

    it("lists projects owned by user", function() {
        var testProjects = [],
            testUser = "testUid";
        spyOn(userService, 'waitForAuth').and.returnValue({
            then: function(fn) {
                fn(testUser);
            }
        });
        firebaseService.getChildRef = function(ref) {
            if (ref === "users/" + testUser + "/projects") {
                return testProjects;
            }
        };
        projectsService.getProjects().then(function(projects) {
            expect(projects).toEqual(testProjects);
        });
        expect(userService.waitForAuth).toHaveBeenCalled();
    });

    it("gets project by hostname", function() {
        var testProject = {};
        spyOn(userService, 'waitForAuth').and.returnValue({
            then: function(fn) {
                fn();
            }
        });
        firebaseService.getObject = function(ref) {
            if (ref === "projects/test") {
                return {
                    then: function(fn) {
                        fn(testProject);
                    }
                };
            }
        };
        projectsService.getProject("test").then(function(project) {
            expect(project).toEqual(testProject);
        });
        expect(userService.waitForAuth).toHaveBeenCalled();
    });
});
