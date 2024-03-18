import type { HAEvent } from "../types";
class Component {
  name: string;
  type: string;
  endpoints: string[];
  version: string;

  constructor(
    name: string,
    type: string,
    endpoints: string[],
    version: string
  ) {
    this.name = name;
    this.type = type;
    this.endpoints = endpoints;
    this.version = version;
  }

  consumeEvent(consumedEvent: HAEvent) {
    console.log(consumedEvent);
  }
}

export default Component;
