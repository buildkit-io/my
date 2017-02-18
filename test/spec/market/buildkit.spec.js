/* global expect Buildkit describe beforeEach*/
describe("Buildkit", function() {
    var buildkit;
    beforeEach(function() {
        buildkit = new Buildkit();
    });

    it("should be able to construct a Buildkit", function() {
        expect(buildkit.name).toEqual("");
        expect(buildkit.title).toEqual("");
        expect(buildkit.description).toEqual("");
        expect(buildkit.createdAt).toEqual("");
        expect(buildkit.createdBy).toEqual("");
    });

});
