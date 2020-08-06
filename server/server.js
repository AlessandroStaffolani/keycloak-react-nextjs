require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const publicApi = require('./api/public');
const userApi = require('./api/user');
const adminApi = require('./api/admin');

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: './client'
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/api/public', publicApi);
  server.use('/api/user', userApi);
  server.use('/api/admin', adminApi);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
