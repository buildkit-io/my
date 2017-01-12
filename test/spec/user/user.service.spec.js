describe("User Service", function() {
    var userService;

    beforeEach(module("bkApp"));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function($provide) {
        $provide.value('$q', {});
        $provide.value('$location', {});
        $provide.value('$firebaseArray', function() {});
        $provide.value('$firebaseAuth', function() {});
    }));

    beforeEach(inject(function(_userService_) {
        userService = _userService_;
    }));

    it("has calculated the answer correctly", function() {
        expect(userService).toBeDefined();
    });
});
