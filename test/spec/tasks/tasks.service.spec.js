/* global inject expect Task */
describe("Tasks Service", function() {
    var tasksService,
        firebaseService;

    beforeEach(module("bkApp"));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function($provide) {
        $provide.value('$firebaseArray', {});
        $provide.value('$firebaseObject', {});
    }));

    beforeEach(inject(function(_tasksService_, _firebaseService_) {
        tasksService = _tasksService_;
        firebaseService = _firebaseService_;
    }));

    it("exists", function() {
        expect(tasksService).toBeDefined();
    });

    it("creates a task with action create given a project", function() {
        spyOn(firebaseService, 'getServerTime');

        var project = {},
            newTask = tasksService.createProject(project);

        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.CREATE);
        expect(newTask.project).toEqual(project);
    });
    
    it("creates a task with action START given a project", function() {
        spyOn(firebaseService, 'getServerTime');
        spyOn(firebaseService, 'addToArray');
                
        var project = {hostname: 'test', test: 'test'};
        
        tasksService.startProject(project);
        
        expect(firebaseService.addToArray).toHaveBeenCalledWith('tasks/test', jasmine.any(Object));
        var newTask = firebaseService.addToArray.calls.mostRecent().args[1];

        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.START);
        expect(newTask.project.hostname).toEqual(project.hostname);
        // start task doesn't need full project
        expect(newTask.project.test).toBeUndefined();
    });
    
    it("creates a task with action RESTART given a project", function() {
        spyOn(firebaseService, 'getServerTime');
        spyOn(firebaseService, 'addToArray');
                
        var project = {hostname: 'test', test: 'test'};

        tasksService.restartProject(project);

        expect(firebaseService.addToArray).toHaveBeenCalledWith('tasks/test', jasmine.any(Object));
        var newTask = firebaseService.addToArray.calls.mostRecent().args[1];

        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.RESTART);
        expect(newTask.project.hostname).toEqual(project.hostname);
        // restart task doesn't need full project
        expect(newTask.project.test).toBeUndefined();
    });
    
    it("creates a task with action STOP given a project", function() {
        var project = {hostname: 'test', test: 'test'};
        
        spyOn(firebaseService, 'getServerTime');
        spyOn(firebaseService, 'addToArray');
        
        tasksService.stopProject(project);

        expect(firebaseService.addToArray).toHaveBeenCalledWith('tasks/test', jasmine.any(Object));
        
        var newTask = firebaseService.addToArray.calls.mostRecent().args[1];
        
        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.STOP);
        expect(newTask.project.hostname).toEqual(project.hostname);
        // stop task doesn't need full project
        expect(newTask.project.test).toBeUndefined();
    });
    
    it("creates a task with action DELETE given a project", function() {
        spyOn(firebaseService, 'getServerTime');
        spyOn(firebaseService, 'addToArray');

        var project = {hostname: 'test', test: 'test'};
        
        tasksService.deleteProject(project);
        var newTask = firebaseService.addToArray.calls.mostRecent().args[1];

        expect(firebaseService.addToArray).toHaveBeenCalledWith('tasks/test', jasmine.any(Object));

        expect(newTask).toBeDefined();
        expect(newTask.action).toEqual(Task.ActionTypes.DELETE);
        expect(newTask.project.hostname).toEqual(project.hostname);
        // delete task doesn't need full project
        expect(newTask.project.test).toBeUndefined();
    });
    
    it("gets a list of tasks given a hostname", function() {
        var hostname = "test";
        
        spyOn(firebaseService, 'getArrayRef').and.returnValue([]);;
        
        expect(tasksService.getTasks(hostname)).toEqual([]);
        expect(firebaseService.getArrayRef).toHaveBeenCalledWith('tasks/test');
    });
});
