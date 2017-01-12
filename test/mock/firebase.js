var firebase = {
    database: function() {
        return {
            ref: function() {
                return {
                    child: function() {}
                }
            }
        };
    }
};
angular.module('firebase', []);
