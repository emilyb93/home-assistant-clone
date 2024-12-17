import Component from "../../Components/baseClass";
import { HAEvent } from "../../types";

type ConsumeFunction = (consumedEvent: HAEvent) => void;

class TestComponent extends Component {
  mockConsume: ConsumeFunction;

  constructor(mockConsume: ConsumeFunction) {
    super("testComponent1", "testComponent", ["endpoint.example.com"], "1.0", [
      "testTopic",
    ]);
    this.mockConsume = mockConsume;
  }

  consumeEvent(consumedEvent: HAEvent): void {
    this.mockConsume(consumedEvent);
  }
}

describe("testComponent", () => {
  test("should be an extension of Component", () => {
    const testComponent = new TestComponent(jest.fn());
    expect(testComponent).toBeInstanceOf(Component);
  });
});

export default TestComponent;
