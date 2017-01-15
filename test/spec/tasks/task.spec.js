/* global expect Task */
describe("Task", function() {
    var task;
    
    beforeEach(function() {
        task = new Task();
    });

    it("should be able to construct a Task", function() {
        expect(task).toBeDefined();
    });
    it("should set Task ActionType and project", function() {
        var project = {};
        task = new Task(Task.ActionTypes.CREATE, project);
        expect(task.action).toEqual(Task.ActionTypes.CREATE);
        expect(task.project).toEqual(project);
    });

});
