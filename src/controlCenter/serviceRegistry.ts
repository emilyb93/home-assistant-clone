class ServiceRegistry {
  services: ServiceRegistryMap = {};

  registerService(service: ServiceInfo): void {
    const serviceInfo = {
      ...service,
      registrationTimestamp: Date.now().toString(),
      health: {
        status: true,
        lastHealthCheck: 0,
        errorMessage: null,
      },
    };
    if (!this.services.hasOwnProperty(service.type)) {
      this.services[service.type] = {};
    }

    this.services[service.type][service.name] = serviceInfo;
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
