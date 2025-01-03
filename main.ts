import express from "express";
import Component from "./Components/Component";
import controlCenter from "./src/ControlCenter";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.sendStatus(200);
});
app.get("/api/services", (req, res) => {
  const services = controlCenter.serviceRegistry.listServices();

  res.status(200).send({ services });
});

app.post("/api/services", (req, res) => {
  const { name, type, endpoints, version, topics } = req.body;

  console.log("registered");
  const component = new Component(name, type, endpoints, version, topics);

  controlCenter.serviceRegistry.registerService(component, "active");

  res
    .status(201)
    .send({ message: `Component: '${name}' successfully registered` });
});

export default app;
