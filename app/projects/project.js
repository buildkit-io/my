function Project() {
    this.name = "";
    this.hostname = "";
    this.tutorial = null;
    this.status = Project.StatusTypes.CREATING;
    this.instance_id = null;
    this.createdAt = "";
    this.createdBy = "";
    this.tasks = {};
    this.users = {};
    this.containers = {};
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