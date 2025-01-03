import EventBus from "./eventBus";
import type {
  ServiceRegistryInfo,
  ServiceRegistryMap,
  ServiceInfo,
  PossibleState,
} from "../../types";
import Component from "../../Components/Component";

class ServiceRegistry {
  services: ServiceRegistryMap = {};
  eventBus: EventBus | null;

  constructor(eventBus: EventBus = null) {
    this.eventBus = eventBus;
  }

  registerService(
    service: Component,
    initialState: PossibleState = "off"
  ): void {
    const serviceInfo = {
      ...service,
      registrationTimestamp: Date.now().toString(),
      health: {
        status: true,
        lastHealthCheck: 0,
        errorMessage: null,
      },
    };
    console.log({ service });

    if (service.topics.length > 0) {
      const topics = service.topics;
      topics.forEach((topicName) => {
        this.eventBus.subscribe(service, topicName);
        console.log(
          "The service: \n",
          service,
          "\n has been subscribed to: ",
          topicName
        );
      });
    }
    if (!this.services.hasOwnProperty(service.type)) {
      this.services[service.type] = {};
    }

    this.services[service.type][service.name] = serviceInfo;

    if (this.eventBus) {
      this.eventBus.emit({
        Type: "service_registered",
        Properties: { componentName: service.name, initialState },
      });
    }
  }

  deregisterService(serviceName: string): void {
    if (this.services.hasOwnProperty(serviceName)) {
      delete this.services[serviceName];
    }
  }

  discoverService(
    serviceType: string,
    serviceVersion?: string | undefined
  ): string[] {
    const servicesRequested = Object.values(this.services[serviceType]);

    const filteredEndpoints = [];

    servicesRequested.forEach(({ version, endpoints }) => {
      const serviceVersionNotProvided = !Boolean(serviceVersion);
      const serviceVersionMatches = version === serviceVersion;

      if (serviceVersionNotProvided || serviceVersionMatches)
        filteredEndpoints.push(...endpoints);

      return filteredEndpoints;
    });

    return filteredEndpoints;
  }

  listServices(): ServiceRegistryInfo[] {
    const servicesRequested = Object.values(this.services);

    const allServices = [];

    servicesRequested.forEach((componentGroups) => {
      const allServicesOfGroup = Object.values(componentGroups);
      allServices.push(...allServicesOfGroup);
    });

    return allServices;
  }
}

export default ServiceRegistry;
