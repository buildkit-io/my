function Project() {
    this.name = "";
    this.hostname = "";
    this.tutorial = null;
    this.ami = null;
    this.status = Project.StatusTypes.AVAILABLE;
    this.createdAt = "";
    this.createdBy = "";
    this.tasks = {};
    this.users = {};
    this.containers = {};
}

Project.StatusTypes = {
	AVAILABLE: "available",
	PENDING: "pending",
    RUNNING: "running",
    SHUTTING_DOWN: "shutting-down",
    TERMINATED: "terminated",
    STOPPING: "stopping",
    STOPPED: "stopped"

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