interface ServiceRegistryInfo {
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

class ServiceRegistry {
  services = {};

  registerService(service: ServiceRegistryInfo) {
    this.services[service.name] = service;
  }

  deregisterService(serviceName) {
    if (this.services.hasOwnProperty(serviceName)) {
      delete this.services[serviceName];
    }
  }
}

export default ServiceRegistry;
