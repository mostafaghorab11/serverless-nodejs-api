const serverless = require("serverless-http");
const express = require("express");

const { getDbClient } = require("./db/clients");
const crud = require("./db/crud");
const { leadValidator } = require("./db/validators");

const app = express();
app.use(express.json());

const STAGE = process.env.STAGE || "prod";

app.get("/", async (req, res, next) => {
  const db = await getDbClient();
  const now = Date.now();
  const [results] = await db`select now();`;
  const delta = (results.now.getTime() - now) / 1000;
  return res.status(200).json({
    message: "Hello from root!",
    delta: delta,
    stage: STAGE,
  });
});

app.get("/leads", async (req, res, next) => {
  const result = await crud.getLeads();
  return res.status(200).json({
    message: "Hello from path!",
    results: result,
  });
});

app.post("/leads", async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await leadValidator(postData);
  if (hasError) {
    return res.status(400).json({
      message: message ? message : "Invalid Request, Please try again!",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
  const result = await crud.addLead(data);
  return res.status(201).json({
    message: "Hello from path!",
    result: result,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);