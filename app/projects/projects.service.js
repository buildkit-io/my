angular.module("bkApp").factory('projectsService', ['$q', '$location', '$firebaseArray', 'userService', function($q, $location, $firebaseArray, userService) {
    var ref = firebase.database().ref().child("projects"),
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
            newProject.createdBy = userService.getUid();
            newProject.createdAt = firebase.database.ServerValue.TIMESTAMP;
            newProject.status = "created";
            var mergedUpdate = {};
            mergedUpdate[ 'users/' + newProject.createdBy + '/projects/' + newProject.hostname ] = true;
            mergedUpdate[ 'projects/' + newProject.hostname ] = newProject;
            mergedUpdate[ 'hostnames/' + newProject.hostname ] = true;
            mergedUpdate[ 'tasks/' + newProject.hostname ] = newProject;
            
            firebase.database().ref().update(mergedUpdate).then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject(error);
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
            mergedUpdate[ 'users/' + userService.getUid() + '/projects/' + hostname] = null;
            mergedUpdate[ 'projects/' + hostname ] = null;
            mergedUpdate[ 'hostnames/' + hostname ] = null;

            firebase.database().ref().update(mergedUpdate).then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
            return deferred.promise;
        }
    };
}]);
