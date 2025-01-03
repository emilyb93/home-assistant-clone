export type HAEvent = {
  Type: string;
  Properties: {
    [key: string]: any;
  };
};

export interface ServiceRegistryInfo {
  name: string;
  type: string;
  endpoints: string[];
  version: string;
  registrationTimestamp: string;
  health: {
    status: boolean;
    lastHealthCheck: number;
    errorMessage: null | string;
  };
}

export interface ServiceInfo {
  name: string;
  type: string;
  endpoints: string[];
  version: string;
  topics: string[];
}

export interface ServiceRegistryInfo extends ServiceInfo {
  registrationTimestamp: string;
  health: {
    status: boolean;
    lastHealthCheck: number;
    errorMessage: null | string;
  };
}

export interface ServiceRegistryMap {
  [componentType: string]: {
    [componentName: string]: ServiceRegistryInfo;
  };
}
export type PossibleState = "active" | "idle" | "off";

import Component from "./Components/Component";

type ComponentOrStateMachine = Component | StateMachine;
export interface TopicsMap {
  [topic: string]: ComponentOrStateMachine[];
}

export interface StateStorage {
  [componentName: string]: PossibleState;
}

import EventBus from "./src/classes/eventBus";
import ServiceRegistry from "./src/classes/serviceRegistry";
import StateMachine from "./src/classes/stateMachine";
import Timer from "./src/classes/timer";

export { EventBus, ServiceRegistry, StateMachine, Timer };
