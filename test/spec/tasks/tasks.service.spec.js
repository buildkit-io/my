/* global inject expect Task */
describe("Tasks Service", function() {
    var tasksService;

    beforeEach(module("bkApp"));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function($provide) {}));

    beforeEach(inject(function(_tasksService_) {
        tasksService = _tasksService_;
    }));

    it("exists", function() {
        expect(tasksService).toBeDefined();
    });

    it("creates a task with action create given a project", function() {
        var project = {},
            newTask = tasksService.createProject(project);

        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.CREATE);
        expect(newTask.project).toEqual(project);
    });
});
