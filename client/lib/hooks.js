import { useState, useEffect } from 'react';
import Keycloak from "keycloak-js";
import keycloakConfig from '../../keycloak.json'

const USER_ACCESS_TOKEN = 'userAccessToken'

const keycloak = new Keycloak(keycloakConfig)

function useUserAuth() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem(USER_ACCESS_TOKEN)
    if (access_token !== null) {

    }

    return auth
  })
}
