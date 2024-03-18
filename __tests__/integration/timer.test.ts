import EventBus from "../../src/controlCenter/eventBus";
import Timer from "../../src/controlCenter/timer";

describe("Timer", () => {
  test("Publishes a time_changed event to the eventBus every 1000 ms", () => {
    jest.useFakeTimers();

    const eventBus = new EventBus();
    const spy = jest.spyOn(eventBus, "emit");

    const timer = new Timer(eventBus);

    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
