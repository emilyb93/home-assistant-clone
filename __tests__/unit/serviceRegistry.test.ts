import ServiceRegistry from "../../src/controlCenter/serviceRegistry";

describe("ServiceRegistry", () => {
  describe("registerService", () => {
    test("should add a the service_name to the registry", () => {
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

      expect(serviceRegistry.services["testComponent1"]).toBe(testComponent);
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
});
