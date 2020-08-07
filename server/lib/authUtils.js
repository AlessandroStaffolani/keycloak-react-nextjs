const keycloak = require("./keycloakApi");
const {send401Response, send403Response, send500Response} = require('./responseUtils')

function verifyToken(spec = undefined) {
  return async function (req, res, next) {
    try {
      try {
        const grant = await keycloak.getGrant(req, res);
        if (grant.isExpired()) {
          send401Response(res)
        } else {
          const token = grant.access_token;
          if (spec === undefined) {
            req.token = token;
            next();
          } else if (spec.indexOf("realm") !== -1) {
            const role = spec.split(":")[1];
            if (token.hasRealmRole(role)) {
              req.token = token;
              next();
            } else {
              send403Response(res)
            }
          } else if (spec.indexOf(":") !== -1) {
            const application = spec.split(":")[0];
            const role = spec.split(":")[1];
            if (token.hasApplicationRole(application, role)) {
              req.token = token;
              next();
            } else {
              send403Response(res)
            }
          } else {
            if (token.hasRole(spec)) {
              req.token = token;
              next();
            } else {
              send403Response(res)
            }
          }
        }
      } catch (err) {
        send401Response(res)
      }
    } catch (err) {
      console.log(err);
      send500Response(res, err.toString())
    }
  }
}

module.exports = {
  verifyToken,
};
