# Keycloak POC

This web application demonstrates how to use Keycloak as an authentication and an authorization system for both a client application (written in React and NextJs) and a server (written in NodeJS).

The functionalities of this application are the following:

- A client application, which has a public section composed of the home page and a public route. In addition, there are 2 protected routes with different levels of authorization (user and admin).
- The client application allows to login using username and password, then, based on the user role, it allows interacting with the protected routes.
- A server with 2 objectives: it serves the client application and it provides a set of API for authenticate the users and for executing some actions with 3 levels of authorization (public, user and admin)
- Keycloak in this scenario keeps the identity of the users, defining different roles (user and admin), and generates tokens which are used to authenticate a user.

Therefore, the application demonstrates how to create 3 levels of authorization (public, user and admin) and for each level it provides 2 actions which can be triggered using a REST paradigm through the client (only if correctly authenticated).

## Installation

### Prerequisites

- docker
- nodejs

### Installation steps

In order to install the application it is necessary to:

- clone the repository
- rename the file ``client/.env.local.sample`` into ``client/.env.local``

```shell script
git clone <url_repo>
```

- run the docker-compose file, which deploys Keycloak, MySQL (used by Keycloak) and the web application (both client and server)

```shell script
docker-compose up -d
```

- when the docker services are running, log into the Keycloak admin page `http://localhost:8080` using username: `admin` and password `admin` and create the sample realm provided in the repository. In order to create the realm click on "Add Realm" button, which is on the top of the sidebar (where there is the master realm) the import the realm file (`keycloak-realm.json`) and save.
- create a client in the Keycloak admin console. In order to do so, click on clients -> create. Choose a name for your client (like `poc-client`), set as root-url the url of the web application (`http://localhost:5000`) and save. After having saved in the client settings choose as "Access Type" the "Confidential" mode and save again.
- export the client configuration from the Keycloak admin console. Inside the client page, move into the "Installation" tab and choose from the select the "Keycloak OIDC Json" format and download the file.
- move the already downloaded client configuration in the ``keycloakConfig`` folder.
- install the web app dependencies

```shell script
npm install
```

- build and start the application

```shell script
npm run build

npm run start
```

Now the application is ready to be used navigating on ``http://localhost:5000``

Note: the realm installed is already configured with 2 users:

- ``alice`` with user role and password `password`
- ``test-admin`` with user and admin role and password `password`
