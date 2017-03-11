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
        expect(project.buildkit).toBeNull();
        expect(project.status).toEqual(Project.StatusTypes.CREATING);
        expect(project.createdAt).toEqual("");
        expect(project.createdBy).toEqual("");
        expect(project.server_queue).toBeNull();
    });
    
    it("should be in ok state if running", function() {
        expect(project.getState()).toEqual(Project.StateTypes.UNKNOWN);
        project.status = Project.StatusTypes.RUNNING;
        expect(project.getState()).toEqual(Project.StateTypes.OK);
    });
    
    it("should be in warning state if starting, stopping or restarting", function() {
        expect(project.getState()).toEqual(Project.StateTypes.UNKNOWN);
        project.status = Project.StatusTypes.STARTING;
        expect(project.getState()).toEqual(Project.StateTypes.WARNING);
    });

    it("should be in error state if failed", function() {
        expect(project.getState()).toEqual(Project.StateTypes.UNKNOWN);
        project.status = Project.StatusTypes.FAILED;
        expect(project.getState()).toEqual(Project.StateTypes.ERROR);
    });

    it("can be start if stopped", function() {
        expect(project.canStart()).toBeFalsy();
        project.status = Project.StatusTypes.STOPPED;
        expect(project.canStart()).toBeTruthy();
    });

    it("can stop if running", function() {
        expect(project.canStop()).toBeFalsy();
        project.status = Project.StatusTypes.RUNNING;
        expect(project.canStop()).toBeTruthy();
    });


});