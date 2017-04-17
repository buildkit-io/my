function Task(action, project) {
    this.action = action;
    this.project = {
        hostname: project.hostname
    };
    if (project.ami) {
    	this.project.ami = project.ami;
    }
    if (project.createdBy) {
    	this.project.createdBy = project.createdBy;
    }
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
    DELETE: "delete",
    DOCKER_PS: "docker_ps"
};
Object.freeze(Task.ActionTypes);

Task.StatusTypes = {
    PENDING: "pending",
    FAILED: "failed",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};
Object.freeze(Task.StatusTypes);
