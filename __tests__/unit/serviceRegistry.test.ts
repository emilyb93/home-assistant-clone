import ServiceRegistry from "../../src/controlCenter/serviceRegistry";

import type {
  ServiceRegistryMap,
  ServiceInfo,
  ServiceRegistryInfo,
} from "../../types";

describe("ServiceRegistry", () => {
  describe("registerService", () => {
    test("should add a the service_name to the registry", () => {
      const serviceRegistry = new ServiceRegistry();

      const testComponent: ServiceInfo = {
        name: "testComponent1",
        type: "test component",
        endpoints: ["http://example.default.svc.cluster.local"],
        version: "1.0",
      };

      serviceRegistry.registerService(testComponent);

      expect(serviceRegistry.services["test component"].testComponent1).toEqual(
        expect.objectContaining({
          ...testComponent,
          registrationTimestamp: expect.any(String),
          health: {
            status: expect.any(Boolean),
            lastHealthCheck: expect.any(Number),
            errorMessage: null,
          },
        })
      );
    });
  });

  describe("deregisterService", () => {
    test("should remove a service from the registry when passed a name", () => {
      const serviceRegistry = new ServiceRegistry();

      const creationTime = Date.now().toString();
      const testComponent: ServiceRegistryInfo = {
        name: "testComponent1",
        type: "test component",
        endpoints: ["http://example.default.svc.cluster.local"],
        version: "1.0",
        registrationTimestamp: creationTime,
        health: {
          status: true,
          lastHealthCheck: 15,
          errorMessage: null,
        },
      };
      serviceRegistry.registerService(testComponent);
      serviceRegistry.deregisterService(testComponent.name);

      expect(serviceRegistry.services["testComponent1"]).toBeUndefined();
    });
  });

  describe("discoverService", () => {
    test("should return the correct endpoint when queried with the service name", () => {
      const serviceRegistry = new ServiceRegistry();

      const creationTime = Date.now().toString();
      const testComponent: ServiceInfo = {
        name: "testComponent1",
        type: "test component",
        endpoints: ["http://example.default.svc.cluster.local"],
        version: "1.0",
      };
      serviceRegistry.registerService(testComponent);

      const serviceURL = serviceRegistry.discoverService("test component");

      expect(serviceURL).toEqual(testComponent.endpoints);
    });

    test("should be able to distinguish between versions", () => {
      const serviceRegistry = new ServiceRegistry();

      const creationTime = Date.now().toString();
      const testComponent1: ServiceInfo = {
        name: "testComponent1",
        type: "test component",
        endpoints: ["http://example1.default.svc.cluster.local"],
        version: "1.0",
      };
      const testComponent2: ServiceInfo = {
        name: "testComponent2",
        type: "test component",
        endpoints: ["http://example2.default.svc.cluster.local"],
        version: "2.0",
      };
      serviceRegistry.registerService(testComponent1);
      serviceRegistry.registerService(testComponent2);

      const serviceURL1 = serviceRegistry.discoverService(
        "test component",
        "1.0"
      );
      const serviceURL2 = serviceRegistry.discoverService(
        "test component",
        "2.0"
      );

      expect(serviceURL1).toEqual(testComponent1.endpoints);
      expect(serviceURL2).toEqual(testComponent2.endpoints);
    });

    test("should just send all possible endpoints when no service version provided", () => {
      const serviceRegistry = new ServiceRegistry();

      const creationTime = Date.now().toString();
      const testComponent1: ServiceInfo = {
        name: "testComponent1",
        type: "test component",
        endpoints: ["http://example1.default.svc.cluster.local"],
        version: "1.0",
      };
      const testComponent2: ServiceInfo = {
        name: "testComponent2",
        type: "test component",
        endpoints: ["http://example2.default.svc.cluster.local"],
        version: "2.0",
      };
      serviceRegistry.registerService(testComponent1);
      serviceRegistry.registerService(testComponent2);

      const serviceURL1 = serviceRegistry.discoverService(
        "test component",
        "1.0"
      );
      const serviceURL2 = serviceRegistry.discoverService(
        "test component",
        "2.0"
      );

      const serviceEndpoints =
        serviceRegistry.discoverService("test component");
      const allEndpoints = [
        ...testComponent1.endpoints,
        ...testComponent2.endpoints,
      ];

      expect(serviceEndpoints).toEqual(allEndpoints);
    });
  });
});

describe("listServices", () => {
  test("should return all services", () => {
    const serviceRegistry = new ServiceRegistry();

    const creationTime = Date.now().toString();
    const testComponent1: ServiceInfo = {
      name: "testComponent1",
      type: "test component",
      endpoints: ["http://example1.default.svc.cluster.local"],
      version: "1.0",
    };
    const testComponent2: ServiceInfo = {
      name: "testComponent2",
      type: "different test component",
      endpoints: ["http://example2.default.svc.cluster.local"],
      version: "2.0",
    };
    serviceRegistry.registerService(testComponent1);
    serviceRegistry.registerService(testComponent2);

    const serviceList = serviceRegistry.listServices();
    expect(serviceList.length).toBe(2);

    serviceList.forEach((service) => {
      expect(service).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          endpoints: expect.any(Array),
          type: expect.any(String),
          version: expect.any(String),
          registrationTimestamp: expect.any(String),
          health: {
            status: expect.any(Boolean),
            lastHealthCheck: expect.any(Number),
            errorMessage: null,
          },
        })
      );
    });
  });
});
