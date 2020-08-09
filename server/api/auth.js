const express = require("express");
const keycloak = require("../lib/keycloakApi");
const {
  send500Response,
  send401Response,
  send400Response,
} = require("../lib/responseUtils");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    send400Response(res, "Username and password are required");
  }
  try {
    const grant = await keycloak.grantManager.obtainDirectly(
      username,
      password
    );
    keycloak.storeGrant(grant, req, res);
    res.status(200);
    return res.json(grant.access_token);
  } catch (err) {
    console.log(err);
    if (err.toString().indexOf("401") !== -1) {
      send401Response(res);
    } else {
      send500Response(res);
    }
  }
});

module.exports = router;
