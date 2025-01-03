jest.useFakeTimers();
import request from "supertest";
import Component from "../../Components/Component";
import app from "../../main";
import controlCenter from "../../src/ControlCenter";
import { response } from "express";

beforeEach(() => {
  return controlCenter.serviceRegistry.clearAllServices();
});

afterAll(() => {
  clearInterval(controlCenter.timer.interval);
  jest.clearAllTimers();
});

describe("API Tests", () => {
  describe("/api/register-service", () => {
    test("should register a new service with the service registry", async () => {
      const motionSensor = {
        name: "kitchen-motion-sensor",
        type: "motion-sensor",
        endpoints: ["test-api.test"],
        version: "1.0.0",
        topics: ["time_changed"],
      };

      const response = await request(app)
        .post("/api/services")
        .send(motionSensor);

      console.log(response.body);

      expect(response.body.message).toBe(
        "Component: 'kitchen-motion-sensor' successfully registered"
      );

      expect(controlCenter.serviceRegistry.listServices()[0].name).toBe(
        motionSensor.name
      );
    });
  });

  describe("/api/services", () => {
    test("GET 200: returns a list of the registered services", async () => {
      const motionSensor = {
        name: "kitchen-motion-sensor",
        type: "motion-sensor",
        endpoints: ["test-api.test"],
        version: "1.0.0",
        topics: ["time_changed"],
      };

      await request(app).post("/api/services").send(motionSensor);

      const response = await request(app).get("/api/services");
      console.log(controlCenter.serviceRegistry.listServices());
      expect(response.body.services.length).toBe(1);
    });
  });
});
