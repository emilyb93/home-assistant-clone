import type EventBus from "./eventBus";

class Timer {
  eventBus: EventBus | null;
  interval: ReturnType<typeof setInterval>;
  constructor(eventBus: EventBus = null) {
    this.eventBus = eventBus;

    this.interval = setInterval(() => {
      eventBus.emit({ Type: "time_changed", Properties: {} });
    }, 1000);
  }
}

export default Timer;
