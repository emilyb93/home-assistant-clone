import type { TopicsMap, HAEvent, StateMachine } from "../../types";
import type Component from "../../Components/baseClass";
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

    console.log(event, "eventBus", subscribers);

    if (subscribers) {
      subscribers.forEach((subscriber) => {
        subscriber.consumeEvent(event);
      });
    }
  }
}

export default EventBus;
