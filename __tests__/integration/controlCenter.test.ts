import EventBus from "../../src/controlCenter/eventBus";
import ServiceRegistry from "../../src/controlCenter/serviceRegistry";
import ControlCenter from "../../src/controlCenter/controlCenter";
import Component from "../../Components/baseClass";

describe.only("ControlCenter", () => {
  describe("ServiceRegistry", () => {
    test("adds the service to the stateMachine for tracking", () => {
      const controlCenter = new ControlCenter();

      const component = new Component(
        "testComponent1",
        "testComponent",
        ["endpoint.example.com"],
        "1.0",
        []
      );

      const { serviceRegistry, stateMachine, timer } = controlCenter;
      serviceRegistry.registerService(component);

      const state = stateMachine.getState(component.name);

      expect(state).toBe("off");

      clearInterval(timer.interval);
    });

    test("subscribes a component to any requested topics upon registration", () => {
      const controlCenter = new ControlCenter();

      const component = new Component(
        "testComponent1",
        "testComponent",
        ["endpoint.example.com"],
        "1.0",
        ["testTopic"]
      );

      const { serviceRegistry, stateMachine, timer } = controlCenter;
      serviceRegistry.registerService(component);

      const consumeSpy = jest.spyOn(component, "consumeEvent");

      const testEvent = {
        Type: "testTopic",
        Properties: {
          message: "check check one two",
        },
      };
      controlCenter.eventBus.emit(testEvent);

      expect(consumeSpy).toHaveBeenCalledWith(testEvent);
    });
  });

  describe("StateMachine", () => {
    test.todo("emits to any subscribers when state has changed");
  });
});
