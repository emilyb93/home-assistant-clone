import EventBus from "../../src/controlCenter/eventBus";
import ServiceRegistry from "../../src/controlCenter/serviceRegistry";
import ControlCenter from "../../src/controlCenter/controlCenter";
import Component from "../../Components/baseClass";

describe("ControlCenter", () => {
  describe("ServiceRegistry", () => {
    // service registry is requested by the component to subscribe to particular topics
    // the service registry uses eventbus.subscribe and passes the new component class
    // component class has a consume event method on it
    // this method will do a request such as /api/consumeEvent but

    // adds service to the stateMachine
    // subscribe the component to any required topics

    test("adds the service to the stateMachine for tracking", () => {
      const controlCenter = new ControlCenter();

      const component = new Component(
        "testComponent1",
        "testComponent",
        ["endpoint.example.com"],
        "1.0"
      );

      const { serviceRegistry, stateMachine, timer } = controlCenter;
      serviceRegistry.registerService(component);

      const state = stateMachine.getState(component.name);

      expect(state).toBe("off");

      clearInterval(timer.interval);
    });
  });
});
