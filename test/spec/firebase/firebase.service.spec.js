/* global inject expect */
describe("Firebase Service", function() {
    var firebaseService,
        firebase = {};

    firebase.database = function(app) {
        return new firebase.database.Database();
    };
    firebase.database.Database = function() {};

    beforeEach(module("bkApp"));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function($provide) {

    }));

    beforeEach(inject(function(_firebaseService_) {
        firebaseService = _firebaseService_;
    }));

    it("exists", function() {
        expect(firebaseService).toBeDefined();
    });

    it("gets a reference id", function() {
        firebase.database.Database.prototype.ref = function() {
            return {
                push: function() {
                    return {
                        key: "test id"
                    };
                }
            };
        };
        window.firebase = firebase;
        expect(firebaseService.getId()).toEqual("test id");
        window.firebase = null;
    });

    it("gets child ref", function() {
        var childRef = {};
        firebase.database.Database.prototype.ref = function(path) {
            return {
                child: function(name) {
                    if (name === "test") {
                        return childRef;
                    }
                    else {
                        return null;
                    }
                }
            };
        };
        window.firebase = firebase;
        expect(firebaseService.getChildRef("test")).toEqual(childRef);
        window.firebase = null;
    });

    it("gets server time", function() {
        firebase.database.ServerValue = {};
        firebase.database.ServerValue.TIMESTAMP = "test time";

        window.firebase = firebase;
        expect(firebaseService.getServerTime()).toEqual("test time");
        window.firebase = null;
    });

    it("executes atomic update", function() {
        firebase.database.Database.prototype.ref = function(path) {
            return {
                update: function(test) {
                    return test;
                }
            };
        };
        window.firebase = firebase;
        expect(firebaseService.update("test update")).toEqual("test update");
        window.firebase = null;
    });

});
