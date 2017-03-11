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
        var project = {server_queue: 'bananas'};
        task = new Task(Task.ActionTypes.CREATE, project);
        expect(task.action).toEqual(Task.ActionTypes.CREATE);
        expect(task.server_queue).toEqual('bananas');
        expect(task.project).toEqual(project);
        expect(task.status).toEqual(Task.StatusTypes.PENDING);
        expect(task.createdAt).toEqual("");
        expect(task.logs).toEqual([]);
    });

});
