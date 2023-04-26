const express = require("express");
const redis = require("redis");
const util = require("util");
const basicAuth = require("express-basic-auth");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const cors = require("cors");
const { Model } = require("objection");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Redis cache configuration
const redisClient = redis.createClient({
  socket: {
    host: "localhost",
    port: "6379",
  },
});
const ttl = 60 * 60; // Cache TTL in seconds

redisClient.on("error", (err) => console.log("Redis Server Error", err));
redisClient.on("connect", () => {
  console.log("Redis Connected!");
});
redisClient.connect();

// Knex configuration
const knexConfig = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "example_password",
    database: "example_database",
  },
};

const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

// Report model
class Report extends Model {
  static get tableName() {
    return "reports";
  }

  static get idColumn() {
    return "id";
  }
}

// Middleware for authentication using basic auth or JWT tokens
const authenticate = (req, res, next) => {
  if (req.auth) {
    return next();
  }
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    return next();
  } catch (err) {
    res.sendStatus(401);
    return;
  }
};
const basicAuthMiddleware = basicAuth({
  users: { admin: "password" },
  challenge: true,
});
const jwtMiddleware = authenticate;

// API endpoint for reports
app.get("/api/reports", async (req, res) => {
  try {
    // Parse query parameters
    const { report_type, page = 0, limit = 10 } = req.query;

    // Generate cache key based on query parameters
    const cacheKey = `reports:${report_type}:${page}:${limit}`;

    // Check if data is available in cache
    const cacheData = await redisClient.get(cacheKey);
    if (cacheData) {
      const data = JSON.parse(cacheData);
      return res.json(data);
    }

    // Query the database using Knex and Objection.js
    const reports = await Report.query()
      .select("id", "name", "date", "value")
      .where("report_type", report_type)
      .page(page, limit);

    // Store data in cache
    redisClient.set(cacheKey, JSON.stringify(reports), "EX", ttl);

    return res.json(reports);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
