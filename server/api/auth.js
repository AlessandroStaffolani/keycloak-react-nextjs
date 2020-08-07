const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const keycloakClient = require("../../keycloak.json");
const Keycloak = require('keycloak-connect')

const router = express.Router();
const keycloak = new Keycloak(keycloakClient)

const baseUrl = `${keycloakClient["auth-server-url"]}`;

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return res.json({
      message: "Username and password are required",
    });
  }
  keycloak.grantManager.obtainDirectly(username, password)
    .then(token => {
      res.status(200);
      return res.json(token);
    })
    .catch(err => {
      console.log(err)
      if (err.toString().indexOf("401") !== -1) {
        res.status(401)
      } else {
        res.status(500)
      }
      return res.json({error: err.toString()})
    })
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
