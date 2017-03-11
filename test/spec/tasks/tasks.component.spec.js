/* global inject expect describe */
describe('component: Tasks', function() {
  var $componentController;

  beforeEach(module('bkApp'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should expose a `tasks` object', function() {
    var bindings = {tasks: []};
    var ctrl = $componentController('tasks', null, bindings);

    expect(ctrl.tasks).toBeDefined();
  });

});