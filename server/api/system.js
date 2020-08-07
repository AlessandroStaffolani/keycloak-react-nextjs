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
      console.log(token)
      const userInfo = await keycloak.grantManager.userInfo(token)
      console.log(userInfo)
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

module.exports = router;
