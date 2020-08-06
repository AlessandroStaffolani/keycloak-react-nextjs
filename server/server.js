require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: './client'
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
