import { EventBus, ServiceRegistry, StateMachine, Timer } from "../../types";

class ControlCenter {
  eventBus: EventBus;
  serviceRegistry: ServiceRegistry;
  stateMachine: StateMachine;
  timer: Timer;

  constructor() {
    this.eventBus = new EventBus();
    this.serviceRegistry = new ServiceRegistry(this.eventBus);
    this.stateMachine = new StateMachine(this.eventBus);
    this.timer = new Timer(this.eventBus);
  }
}

export default ControlCenter;
