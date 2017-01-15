/* global angular firebase */
angular.module("bkApp").factory('projectsService', ['$q', '$location', '$firebaseArray', 'userService', 'tasksService', 'firebaseService',
    function($q, $location, $firebaseArray, userService, tasksService, firebaseService) {
        var ref = firebaseService.getChildRef("projects"),
            projects = null;

        return {
            getProjects: function() {
                var deferred = $q.defer();
                userService.waitForAuth().then(function() {
                    if (projects == null) {
                        projects = $firebaseArray(ref);
                    }
                    projects.$loaded()
                        .then(function(loadedProjects) {
                            deferred.resolve(loadedProjects);
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });
                });
                return deferred.promise;
            },

            getProject: function(hostname) {
                var deferred = $q.defer();
                this.getProjects()
                    .then(function(loadedProjects) {
                        deferred.resolve(loadedProjects.$getRecord(hostname));
                    })
                    .catch(function(error) {
                        deferred.reject(error);
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
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });
                });

                return deferred.promise;
            },

            deleteProject: function(hostname) {
                var deferred = $q.defer();
                //     projectIndex = projects.$indexFor(hostname);

                // if (projectIndex != -1) {
                //     projects.$remove(projectIndex).then(function(deletedRecord) {
                //         deferred.resolve(deletedRecord);
                //     });
                // }
                // else {
                //     deferred.reject();
                // }
                var mergedUpdate = {};
                mergedUpdate['users/' + userService.getUid() + '/projects/' + hostname] = null;
                mergedUpdate['projects/' + hostname] = null;
                mergedUpdate['hostnames/' + hostname] = null;

                firebaseService.update(mergedUpdate).then(function() {
                        deferred.resolve();
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        };
    }
]);
