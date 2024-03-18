import type EventBus from "./eventBus";

class Timer {
  eventBus: EventBus | null;
  constructor(eventBus: EventBus = null) {
    this.eventBus = eventBus;

    setInterval(() => {
      eventBus.emit({ Type: "time_changed", Properties: {} });
    }, 1000);
  }
}

export default Timer;
