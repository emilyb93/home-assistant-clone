import type {
  StateStorage,
  PossibleState,
  EventBus,
  HAEvent,
} from "../../types";

type ConsumeEventFunction = (event: HAEvent) => void;
interface EventMap {
  [key: string]: ConsumeEventFunction;
}
class StateMachine {
  storage: StateStorage = {};
  eventBus: EventBus | null;

  eventMap: EventMap = {};
  constructor(eventBus: EventBus = null) {
    this.eventBus = eventBus;

    this.eventMap.service_registered = ({
      Properties: { componentName, intialState },
    }) => {
      console.log({ componentName, intialState }, "<<<<<<<");
      this.addState(componentName, intialState);
    };

    this.eventBus.subscribe(this, "service_registered");
  }

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

  consumeEvent(event: HAEvent) {
    const eventFunction = this.eventMap[event.Type];

    console.log(event, "<<<<< consume");

    if (eventFunction) eventFunction(event);
  }

  getState(componentName: string): string {
    return this.storage[componentName];
  }
}

export default StateMachine;
