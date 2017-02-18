/* global angular firebase */
angular.module("bkApp").factory('firebaseService', ['$q', '$firebaseArray', 
'$firebaseObject', function($q, $firebaseArray, $firebaseObject) {
    return {
        getId: function() {
            return firebase.database().ref().push().key;
        },
        getChildRef: function(child) {
            return firebase.database().ref(child);
        },
        getServerTime: function() {
            return firebase.database.ServerValue.TIMESTAMP;
        },
        update: function(data) {
            return firebase.database().ref().update(data);
        },
        getObject: function(path) {
            return $firebaseObject(this.getChildRef(path)).$loaded();
        },
        getArray: function(path) {
            return $firebaseArray(this.getChildRef(path)).$loaded();
        }
    };
}]);
