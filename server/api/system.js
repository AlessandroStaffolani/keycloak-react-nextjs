const express = require("express");
const initKeycloakAdapter = require("../lib/keycloakApi");
const { verifyToken } = require("../lib/authUtils");
const { send401Response, send403Response, send500Response} = require('../lib/responseUtils')

const keycloak = initKeycloakAdapter()

const router = express.Router();

router.get("/users/me", verifyToken(), async (req, res, next) => {
  try {
    const grant = await keycloak.getGrant(req, res);
    if (grant.isExpired()) {
      res.sendStatus(401);
    } else {
      const token = grant.access_token;
      const userInfo = await keycloak.grantManager.userInfo(token);
      res.status(200);
      res.json(userInfo);
    }
  } catch (err) {
    console.log(err);
    if (err.toString().indexOf("401") !== -1) {
      res.sendStatus(401);
    } else if (err.toString().indexOf("403") !== -1) {
      res.sendStatus(403);
    } else {
      res.sendStatus(500);
    }
  }
});

router.get(
  "/users/has/realmrole/:role",
  verifyToken(undefined, true),
  async (req, res, next) => {
    const role = req.params.role;
    try {
      const grant = await keycloak.getGrant(req, res);
      if (grant.isExpired()) {
        res.sendStatus(401);
      } else {
        const token = grant.access_token;
        res.status(200);
        res.json({ status: 200, hasRole: token.hasRealmRole(role), role });
      }
    } catch (err) {
      console.log(err);
      if (err.toString().indexOf("401") !== -1) {
        res.json({status: 401, message: 'Unauthorized'})
      } else if (err.toString().indexOf("403") !== -1) {
        res.json({status: 403, message: 'Forbidden'})
      } else {
        send500Response(res)
      }
    }
  }
);

module.exports = router;
