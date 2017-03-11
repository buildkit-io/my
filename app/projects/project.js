function Project() {
    this.name = "";
    this.hostname = "";
    this.spec = "";
    this.buildkit = null;
    this.status = Project.StatusTypes.CREATING;
    this.server_queue = null;
    this.createdAt = "";
    this.createdBy = "";
}

Project.StatusTypes = {
    CREATING: "creating",
    FAILED: "failed",
    STARTING: "starting",
    RUNNING: "running",
    STOPPED: "stopped",
    STOPPING: "stopping",
    RESTARTING: "restarting"
};
Object.freeze(Project.StatusTypes);
Project.StateTypes = {
    UNKNOWN: "unknown",
    OK: "ok",
    ERROR: "error",
    WARNING: "warning"
};
Object.freeze(Project.StateTypes);

Project.prototype = {
    constructor: Project
};

Project.prototype.getState = function() {
    switch (this.status) {
        case Project.StatusTypes.RUNNING: 
            return Project.StateTypes.OK;
        case Project.StatusTypes.STARTING:
        case Project.StatusTypes.STOPPING:
        case Project.StatusTypes.RESTARTING:
            return Project.StateTypes.WARNING;
        case Project.StatusTypes.FAILED: 
            return Project.StateTypes.ERROR;
        default:
            return Project.StateTypes.UNKNOWN;
    }
};

Project.prototype.canStart = function() {
    return this.status === Project.StatusTypes.STOPPED;
};

Project.prototype.canStop = function() {
    return this.status === Project.StatusTypes.RUNNING;
};