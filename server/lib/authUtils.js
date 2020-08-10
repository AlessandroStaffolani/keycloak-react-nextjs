const initKeycloakAdapter = require("./keycloakApi");
const {send401Response, send403Response, send500Response} = require('./responseUtils')

const keycloak = initKeycloakAdapter();

function verifyToken(spec = undefined, noError=false) {
  return async function (req, res, next) {
    try {
      try {
        const grant = await keycloak.getGrant(req, res);
        if (grant.isExpired()) {
          if (!noError) {
            send401Response(res)
          } else {
            res.json({status: 401, message: 'Unauthorized'})
          }
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
              if (!noError) {
                send403Response(res)
              } else {
                res.json({status: 403, message: 'Forbidden'})
              }
            }
          } else if (spec.indexOf(":") !== -1) {
            const application = spec.split(":")[0];
            const role = spec.split(":")[1];
            if (token.hasApplicationRole(application, role)) {
              req.token = token;
              next();
            } else {
              if (!noError) {
                send403Response(res)
              } else {
                res.json({status: 403, message: 'Forbidden'})
              }
            }
          } else {
            if (token.hasRole(spec)) {
              req.token = token;
              next();
            } else {
              if (!noError) {
                send403Response(res)
              } else {
                res.json({status: 403, message: 'Forbidden'})
              }
            }
          }
        }
      } catch (err) {
        if (!noError) {
          send401Response(res)
        } else {
          res.json({status: 401, message: 'Unauthorized'})
        }
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
