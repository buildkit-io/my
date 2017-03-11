/* global uuid */
function Task(action, project) {
    this.action = action;
    this.server_queue = project?project.server_queue:null;
    this.project = project;
    this.status = Task.StatusTypes.PENDING;
    this.createdAt = "";
    this.logs = [];
}

Task.prototype = {
    constructor: Task
};

Task.ActionTypes = {
    CREATE: "create",
    START: "start",
    STOP: "stop",
    RESTART: "restart",
    DELETE: "delete"
};
Object.freeze(Task.ActionTypes);

Task.StatusTypes = {
    PENDING: "pending",
    FAILED: "failed",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};
Object.freeze(Task.StatusTypes);
