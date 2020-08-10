const keycloakClient = require("../../keycloakConfig/keycloak.json");
const Keycloak = require("keycloak-connect");

let keycloak;

function initKeycloakAdapter(options=undefined) {
  if (keycloak) {
    return keycloak
  }
  if (options) {
    keycloak = new Keycloak(options, keycloakClient)
  } else {
    keycloak = new Keycloak(keycloakClient, keycloakClient)
  }
  return keycloak
}

module.exports = initKeycloakAdapter;
