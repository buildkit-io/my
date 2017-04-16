/* global angular firebase */
angular.module("bkApp").factory('projectsService', ['$q', '$location', '$firebaseArray', 'userService', 'tasksService', 'firebaseService',

function($q, $location, $firebaseArray, userService, tasksService,
firebaseService) {

    return {
        addProject: function(newProject) {
            var deferred = $q.defer();
            userService.waitForAuth().then(function() {
                newProject.createdAt = firebaseService.getServerTime();
                newProject.createdBy = userService.getUid();
                newProject.tasks = {};
                newProject.users = {};
                newProject.users[userService.getUid()] = true;
                var mergedUpdate = {};
                mergedUpdate['users/' + newProject.createdBy + '/projects/' + newProject.hostname] = true;
                mergedUpdate['projects/' + newProject.hostname] = newProject;
                mergedUpdate['hostnames/' + newProject.hostname] = true;
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
