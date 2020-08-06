const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const keycloakClient = require("../../keycloak.json");

const router = express.Router();

const baseUrl = `${keycloakClient["auth-server-url"]}`;

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return res.json({
      message: "Username and password are required",
    });
  }
  const requestBody = {
    username,
    password,
    grant_type: "password",
    client_id: keycloakClient.resource,
    scope: "openid",
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const url = `${baseUrl}realms/${keycloakClient.realm}/protocol/openid-connect/token`;
  try {
    const response = await axios.post(url, qs.stringify(requestBody), config);
    res.status(response.status);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      res.status(error.response.status);
      return res.json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500);
      return res.json({ error: "No response received" });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500);
      return res.json({ error: "Generic error" });
    }
  }
});

router.post('/token/verify', async (req, res, next) => {
  const {token} = req.body;
  if (!token) {
    res.status(400)
    return res.json({
      message: "Token is required",
    });
  }
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const url = `${baseUrl}realms/${keycloakClient.realm}/protocol/openid-connect/userinfo`;
  try {
    const response = await axios.get(url, config);
    res.status(200)
    return res.json({ isValid: true, token })
  } catch (error) {
    res.status(200)
    return res.json({ isValid: false, token})
  }

})

module.exports = router;
