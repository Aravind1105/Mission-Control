# Livello Mission Control

### Environment

Before you can start local development or deployment you have to create a `.env` file.
You will find the contents at confluence: [#04 Mission Control](https://livello.atlassian.net/wiki/spaces/LIV/pages/753759/04+Mission+Control)

### Development:

Run a development server on `http://localhost:3000`

```bash
> npm i
> npm start
```

### Deployment:

Currently builds and deployments are not CI/CD integrated.

## !!! Attention !!!

you have to alter the .env for the environment before deploy!
please meke sure that at least the name of the app ends with `prod` or `stage` and
the `API_PROXY_URL` is the right one: (stage or prod)

```
APP_NAME=livello-mission-control-stage
API_PROXY_URL=https://api-stage.livello.com/api
```

For building and deployment there are several build commands. You can always use `make help`.

```
make help                           Show commands and description.
make build                          Build dist and docker image
make build-dist                     Build the application dist
make build-docker                   Build the docker container from dist
make run-local                      Run docker image local
make deploy-docker                  Deploys the docker image to Gcloud
make deploy-staging                 Deploy to staging
make deploy-staging-service         Deploy staging service
make deploy-production              Deploy to production
make deploy-production-service      Deploy production service
```

### Application folder structure

```bash
.
├── config # Webpack config
├── dist # Webpack config
├── public # Statics which get deployed to google bucket
├── scripts # Helper scripts for deployment etc.
└── src
    ├── core  # Application core, this is where everything gets combined and core functionality lives.
    │   ├── actions
    │   ├── components
    │   ├── reducers
    │   ├── routes
    │   ├── sagas
    │   ├── selectors
    │   ├── App.js
    │   ├── reducers.js # Register module reducers here
    │   └── sagas.js  # Register sagas here
    ├── lib # Common librarys
    ├── modules # Application modules, should try to avoid cross depenencies
    │   ├── authentication
    │   │   ├── actions
    │   │   ├── components
    │   │   ├── reducers
    │   │   ├── sagas
    │   │   ├── selectors
    │   │   ├── constants.js
    │   │   ├── helpers.js
    │   │   ├── LoginScreen.js
    │   │   └── loginScreen.less
    │   ├── dashboard
    │   └── ...
    └── styling # Semantic ui theming
```

### Routing

For authed routes there is a configuration file `./src/core/router/routes.js`.
Your routes and a nav entry will be generated.

```js
[
  {
    name: 'Dashboard',
    path: '/',
    pathOptions: {
      exact: true,
    },
    icon: 'home',
    Component: DashboardScreen,
  },
  {
    name: 'Kiosks',
    path: '/kiosks',
    icon: 'snowflake',
    Component: KiosksScreen,
  },
  ...
]
```

If you want your route to be lazy loaded e.g.:

```js
const Reports = lazy(() => import('modules/reports'));
```

### Conventions

_Actions_

Prefix action names with the action target.

```js
import { createAction } from 'redux-actions';

// Saga actions
export const USER_SAGA_AUTHENTICATE = '@@saga/USER_AUTHENTICATE';
export const authenticateUserSaga = createAction(USER_SAGA_AUTHENTICATE);

export const USER_SAGA_HANDLE_AUTH = '@@saga/USER_HANDLE_AUTH';
export const handleAuthUserSaga = createAction(USER_SAGA_HANDLE_AUTH);

export const USER_SAGA_RENEW_SESSION = '@@saga/USER_RENEW_SESSION';
export const renewSessionUserSaga = createAction(USER_SAGA_RENEW_SESSION);

export const USER_SAGA_LOGOUT = '@@saga/USER_LOGOUT';
export const logoutUserSaga = createAction(USER_SAGA_LOGOUT);

// State actions
export const USER_STATE_UPDATE = '@@state/USER_UPDATE';
export const updateUser = createAction(USER_STATE_UPDATE);
```

_Styles_

Actually we dont use any specific style tooling. Just write your custom less code and place the file beneath the specific component file.

If you have the feeling that your styling should be applied for the whole application please create an override for semantic-ui. `./src/styling/theme/globals/site.overrides` e.g.
