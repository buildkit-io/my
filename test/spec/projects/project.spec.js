/* global expect Project */
describe("Project", function() {
    var project;
    beforeEach(function() {
        project = new Project();
    });

    it("should be able to construct a Project", function() {
        expect(project.hostname).toEqual("");
        expect(project.name).toEqual("");
        expect(project.spec).toEqual("");
        expect(project.createdAt).toEqual("");
        expect(project.createdBy).toEqual("");
    });

});
