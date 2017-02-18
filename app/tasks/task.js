/* global */
function Task(action, project) {
    this.action = action;
    this.project = project;
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
