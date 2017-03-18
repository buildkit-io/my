/* global angular Auth0Lock Auth0 localStorage */
/*eslint-env browser */
angular.module("bkApp").factory('userService', ['$q', '$location', '$firebaseArray', '$firebaseAuth', 'firebaseService',
function($q, $location, $firebaseArray, $firebaseAuth, firebaseService) {
    var hostnames = $firebaseArray(firebaseService.getChildRef("hostnames")),
        authObj = $firebaseAuth();

    var lock = new Auth0Lock('nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M', 'buildkit.eu.auth0.com', {
        closable: false
    });
    var auth0 = new Auth0({
        domain: 'buildkit.eu.auth0.com',
        clientID: 'nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M'
    });

    var exchangeToken = function(token) {
        // Set the options to retreive a firebase delegation token
        var options = {
            id_token: token,
            api: 'firebase',
            scope: 'openid name email displayName',
            target: 'nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M'
        };

        // Make a call to the Auth0 '/delegate'
        auth0.getDelegationToken(options, function(err, result) {
            if (!err) {
                // Exchange the delegate token for a Firebase auth token
                authObj.$signInWithCustomToken(result.id_token).then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error) {
                    console.log(error);
                });
            }
            else {
                console.log(err);
            }
        });
    };

    lock.on("hash_parsed", function(authResult) {
        if (authResult == null) {
            // not a login redirect
            hostnames.$loaded()
                .then(function() {
                    console.log("Logged in as: " + authObj.$getAuth().uid);
                })
                .catch(function(error) {
                    if (error.code == "PERMISSION_DENIED") {
                        // user is logged off
                        lock.show();
                    }
                    else {
                        console.log(error);
                    }
                });
        }
        else {
            // login redirect
            lock.getProfile(authResult.idToken, function(error, profile) {
                if (error) {
                    // handle error
                    console.log(error);
                    return;
                }
                localStorage.setItem('idToken', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));

                exchangeToken(authResult.idToken);
            });
        }
    });

    return {
        waitForAuth: function() {
            var deferred = $q.defer(),
                offHolder = {};
            if (authObj.$getAuth()) {
                deferred.resolve(authObj.$getAuth().uid);
            }
            else {
                offHolder.offAuth = authObj.$onAuthStateChanged(function(authData) {
                    if (authData) {
                        deferred.resolve(authObj.$getAuth().uid);
                        this.offAuth();
                    }
                }, offHolder);
            }
            return deferred.promise;
        },
        getProfile: function() {
            var deferred = $q.defer();
            this.waitForAuth().then(function() {
                deferred.resolve(angular.fromJson(localStorage.getItem('profile')));
            }).catch(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getUser: function() {
            var deferred = $q.defer();
            this.waitForAuth().then(function(uid) {
                deferred.resolve(firebaseService.getChildRef("users/"+uid));
            }).catch(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getUid: function() {
            return authObj.$getAuth().uid;
        }
    };
}]);