const express = require("express");
const keycloak = require('../lib/keycloakApi')
const {verifyToken} = require('../lib/authUtils')

const router = express.Router();

router.get('/users/me', verifyToken(), async (req, res, next) => {
  try {
    const grant = await keycloak.getGrant(req, res);
    if (grant.isExpired()) {
      res.sendStatus(401)
    } else {
      const token = grant.access_token
      const userInfo = await keycloak.grantManager.userInfo(token)
      res.status(200)
      res.json(userInfo)
    }
  } catch (err) {
    console.log(err)
    if (err.toString().indexOf("401") !== -1) {
      res.sendStatus(401)
    } else if (err.toString().indexOf("403") !== -1) {
      res.sendStatus(403)
    } else {
      res.sendStatus(500)
    }
  }
})

router.get('/users/has/realmrole/:role', verifyToken(), async (req, res, next) => {
  const role = req.params.role;
  try {
    const grant = await keycloak.getGrant(req, res);
    if (grant.isExpired()) {
      res.sendStatus(401)
    } else {
      const token = grant.access_token
      res.status(200)
      res.json({hasRole: token.hasRealmRole(role), role})
    }
  } catch (err) {
    console.log(err)
    if (err.toString().indexOf("401") !== -1) {
      res.sendStatus(401)
    } else if (err.toString().indexOf("403") !== -1) {
      res.sendStatus(403)
    } else {
      res.sendStatus(500)
    }
  }
})

module.exports = router;
