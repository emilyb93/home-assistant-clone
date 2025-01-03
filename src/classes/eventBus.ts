import type { TopicsMap, HAEvent, StateMachine } from "../../types";
import type Component from "../../Components/Component";
class EventBus {
  topics: TopicsMap = {};

  constructor() {
    this.topics["time_changed"] = [];
  }

  createTopic(topicName: string) {
    if (!this.topics[topicName]) {
      this.topics[topicName] = [];
    }
  }

  subscribe(component: Component | StateMachine, topic: string) {
    if (!this.topics.hasOwnProperty(topic)) {
      this.createTopic(topic);
    }

    this.topics[topic].push(component);
  }

  emit(event: HAEvent) {
    const { Type } = event;
    const subscribers = this.topics[Type];

    console.log(
      "The following event: \n",
      event,
      "\n has been emitted to these subscribers: \n",
      subscribers
    );

    if (subscribers) {
      subscribers.forEach((subscriber) => {
        subscriber.consumeEvent(event);
      });
    }
  }
}

export default EventBus;
