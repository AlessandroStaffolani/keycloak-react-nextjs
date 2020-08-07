const keycloakClient = require("../../keycloak.json");
const Keycloak = require("keycloak-connect");

const keycloak = new Keycloak(keycloakClient);

module.exports = keycloak;
