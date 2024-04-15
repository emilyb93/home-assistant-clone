import EventBus from "../../src/controlCenter/eventBus";

describe("EventBus", () => {
  describe("createTopic", () => {
    test("should create topic with an array", () => {
      const eventBus = new EventBus();
      eventBus.createTopic("testTopic");

      expect(eventBus.topics.testTopic).toEqual([]);
    });
    test("should not replace the array of subscribers when the topic already exists", () => {
      const eventBus = new EventBus();
      eventBus.createTopic("testTopic");

      const prevTopicArray = eventBus.topics.testTopic;

      eventBus.createTopic("testTopic");

      expect(eventBus.topics.testTopic).toBe(prevTopicArray);
    });
  });
  describe("subscribe", () => {
    test("should add a subscriber to the topic provided", () => {
      const eventBus = new EventBus();
      eventBus.createTopic("testTopic");
      const testComponent = {
        name: "testComponent",
        type: "mock component",
        endpoints: [],
        version: "1.0",
        topics: [],
        consumeEvent: console.log,
      };

      eventBus.subscribe(testComponent, "testTopic");

      expect(eventBus.topics.testTopic).toContain(testComponent);
    });

    test("should do nothing if the topic does not exist", () => {
      const eventBus = new EventBus();

      const testComponent = {
        name: "testComponent",
        type: "mock component",
        endpoints: [],
        version: "1.0",
        topics: [],
        consumeEvent: console.log,
      };

      expect(eventBus.topics).toEqual({ time_changed: [] });

      eventBus.subscribe(testComponent, "test_topic");

      expect(eventBus.topics).toEqual({
        time_changed: [],
        test_topic: [testComponent],
      });
    });
  });
  describe("emit", () => {
    test("should emit an event to all subscribers of a topic", () => {
      const eventBus = new EventBus();
      eventBus.createTopic("testTopic");

      const mockConsumeEvent = jest.fn();
      const mockComponent = {
        name: "mockComponent",
        type: "mock component",
        endpoints: [],
        version: "1.0",
        topics: [],
        consumeEvent: mockConsumeEvent,
      };

      eventBus.subscribe(mockComponent, "testTopic");

      eventBus.emit({
        Type: "testTopic",
        Properties: {
          message: "check check one two",
        },
      });

      expect(mockConsumeEvent).toHaveBeenCalled();
    });
  });
});
