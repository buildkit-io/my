/* global inject expect describe */
describe('component: Project Containers', function() {
  var $componentController;

  beforeEach(module('bkApp'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should expose a `project` object', function() {
    var bindings = {project: {hostname: 'Wolverine'}};
    var ctrl = $componentController('projectContainers', null, bindings);

    expect(ctrl.project).toBeDefined();
    expect(ctrl.project.hostname).toBe('Wolverine');
  });

});