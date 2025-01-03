import EventBus from "../../src/classes/eventBus";
import Timer from "../../src/classes/timer";

describe("Timer", () => {
  test("Publishes a time_changed event to the eventBus every 1000 ms", async () => {
    const eventBus = new EventBus();
    const spy = jest.spyOn(eventBus, "emit");

    jest.useFakeTimers();
    const timer = new Timer(eventBus);

    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(2);

    clearInterval(timer.interval);

    jest.clearAllTimers();
  });
});
