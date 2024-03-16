import StateMachine from "../../src/controlCenter/stateMachine";

describe("StateMachine", () => {
  describe("addState", () => {
    test("should add new component state to the storage", () => {
      const stateMachine = new StateMachine();

      stateMachine.addState("testComponent", "off");

      expect(stateMachine.storage.testComponent).toBe("off");
    });
  });
  describe("transitionState", () => {
    test("should transition component state to new state", () => {
      const stateMachine = new StateMachine();

      stateMachine.addState("testComponent", "off");
      stateMachine.transitionState("testComponent", "off", "active");

      expect(stateMachine.storage.testComponent).toBe("active");
    });
    test("should do nothing if the component does not exist already", () => {
      const stateMachine = new StateMachine();

      stateMachine.transitionState("testComponent", "off", "active");

      expect(stateMachine.storage.testComponent).toEqual(undefined);
    });
    test("should do nothing if the current state supplied does not match", () => {
      const stateMachine = new StateMachine();

      stateMachine.addState("testComponent", "off");
      stateMachine.transitionState("testComponent", "idle", "active");
      expect(stateMachine.storage.testComponent).toBe("off");
    });
  });
});

export {};
