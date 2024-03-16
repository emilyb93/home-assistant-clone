type PossibleState = "active" | "idle" | "off";
interface StateStorage {
  [componentName: string]: PossibleState;
}

class StateMachine {
  storage: StateStorage = {};
  constructor() {}

  addState(componentName: string, initialState: PossibleState) {
    this.storage[componentName] = initialState;
  }

  transitionState(
    componentName: string,
    currentState: PossibleState,
    newState: PossibleState
  ) {
    if (
      this.storage.hasOwnProperty(componentName) &&
      this.storage[componentName] === currentState
    ) {
      this.storage[componentName] = newState;
    }
  }
}

export default StateMachine;
