require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
const bodyParser = require("body-parser");
const initKeycloakAdapter = require('./lib/keycloakApi');
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./client",
});
const handle = app.getRequestHandler();

const memoryStore = new session.MemoryStore();
const keycloak = initKeycloakAdapter({
  store: memoryStore,
});

const { verifyToken } = require('./lib/authUtils')

const authApi = require("./api/auth");
const systemApi = require("./api/system");
const publicApi = require("./api/public");
const userApi = require("./api/user");
const adminApi = require("./api/admin");

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  // Enable CORS support
  server.use(cors());
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  server.use(
    keycloak.middleware({
      logout: "/logout",
      admin: "/"
    })
  );

  server.use("/api/public", publicApi);
  server.use("/api/auth", authApi);
  server.use("/api/system", systemApi);
  server.use("/api/user", verifyToken("realm:user"), userApi);
  server.use("/api/admin", verifyToken("realm:admin"), adminApi);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
