/* global angular firebase */
angular.module("bkApp").factory('projectsService', ['$q', '$location', '$firebaseArray', 'userService', 'tasksService', 'firebaseService',

function($q, $location, $firebaseArray, userService, tasksService,
firebaseService) {
    var projects;

    return {
        getProjects: function() {
            var deferred = $q.defer(),
                projectsService = this;
            userService.waitForAuth().then(function(uid) {
                if (projects) {
                    deferred.resolve(projects);
                }
                else {
                    var projectsList = $firebaseArray(
                    firebaseService.getChildRef("users/" + uid + "/projects"));
                    projectsList.$loaded().then(function(loadedProjects) {
                        projects = [];
                        loadedProjects.forEach(function(project) {
                            projectsService.getProject(project.$id).then(function(loadedProject) {
                                projects.push(loadedProject);
                            });
                        });
                        projectsList.$watch(function(event) {
                            if (event.event === "child_added") {
                                projectsService.getProject(event.key).then(function(loadedProject) {
                                    projects.push(loadedProject);
                                });
                            }
                            else if (event.event === "child_removed") {
                                for (var i = 0; i < projects.length; i++) {
                                    if (projects[i].$id === event.key) {
                                        projects.splice(i, 1);
                                        break;
                                    }
                                }

                            }
                        });
                        deferred.resolve(projects);
                    }).
                    catch (function(error) {
                        deferred.reject(error);
                    });
                }
            });
            return deferred.promise;
        },

        getProject: function(hostname) {
            var deferred = $q.defer();
            userService.waitForAuth().then(function() {
                firebaseService.getObject("projects/" + hostname).then(function(project) {
                    deferred.resolve(Object.assign(new Project(), project));
                });
            });
            return deferred.promise;
        },

        hasProjects: function() {
            return projects && projects.length > 0;
        },

        addProject: function(newProject) {
            var deferred = $q.defer();
            userService.waitForAuth().then(function() {
                newProject.createdAt = firebaseService.getServerTime();
                newProject.createdBy = userService.getUid();

                var mergedUpdate = {};
                mergedUpdate['users/' + newProject.createdBy + '/projects/' + newProject.hostname] = true;
                mergedUpdate['projects/' + newProject.hostname] = newProject;
                mergedUpdate['hostnames/' + newProject.hostname] = true;
                mergedUpdate['tasks/' + firebaseService.getId()] = tasksService.createProject(newProject);

                firebaseService.update(mergedUpdate).then(function() {
                    deferred.resolve();
                }).
                catch (function(error) {
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        },

        deleteProject: function(hostname) {
            var deferred = $q.defer();
            var mergedUpdate = {};
            mergedUpdate['users/' + userService.getUid() + '/projects/' + hostname] = null;
            mergedUpdate['projects/' + hostname] = null;
            mergedUpdate['hostnames/' + hostname] = null;

            firebaseService.update(mergedUpdate).then(function() {
                deferred.resolve();
            }).
            catch (function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}]);
