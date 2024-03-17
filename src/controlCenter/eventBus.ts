interface TopicsMap {
  [topic: string]: Component[];
}

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

  subscribe(component: Component, topic: string) {
    if (this.topics.hasOwnProperty(topic)) {
      this.topics[topic].push(component);
    }
  }

  emit(event: HAEvent) {
    const { Type } = event;
    this.topics[Type].forEach((subscriber) => {
      subscriber.consumeEvent(event);
    });
  }
}

export default EventBus;
