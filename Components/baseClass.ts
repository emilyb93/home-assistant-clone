import type { HAEvent } from "../types";
class Component {
  name: string;
  type: string;
  endpoints: string[];
  version: string;
  topics: string[];

  constructor(
    name: string,
    type: string,
    endpoints: string[],
    version: string,
    topics: string[]
  ) {
    this.name = name;
    this.type = type;
    this.endpoints = endpoints;
    this.version = version;
    this.topics = topics;
  }

  consumeEvent(consumedEvent: HAEvent) {
    console.log(this.name, " has consumed this event: \n", consumedEvent);
  }
}

export default Component;
