/* global angular firebase */
angular.module("bkApp").factory('firebaseService', [function() {
    return {
        getId: function() {
            return firebase.database().ref().push().key;
        },
        getChildRef: function(child) {
            return firebase.database().ref().child(child);
        },
        getServerTime: function() {
            return firebase.database.ServerValue.TIMESTAMP;
        },
        update: function(data) {
            return firebase.database().ref().update(data);
        }
    };
}]);
