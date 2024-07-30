# Build a Fynd Extension using node.js + vue.js(vue3)

[![Coverage Status][coveralls-badge]]([coveralls-url])

This project outlines the development process for a Fynd extension that displays product listings for a company and its associated applications. By following this guide, you'll be able to set up the development environment, build the extension locally, and understand the testing procedures.

## Quick start
### Prerequisites
* You have created a [partner account](https://partners.fynd.com).
* You have created a [development account](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#create-development-account) and [populated test data](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#populate-test-data) in it.
* You’ve installed [Node 16.X.X](https://docs.npmjs.com/) or above version.
* You have created an [extension](https://partners.fynd.com) in partner panel. if not, you can follow [extension guide](https://partners.fynd.com/help/docs/partners/getting-started/create-extension) to create an extension.
* You have setup ngrok account to creates a tunnel and updated `EXTENSION_BASE_URL` env variable value to the ngrok URL.
* Update below environment variable value in `.env` file
    - EXTENSION_API_KEY:`extension api key`
    - EXTENSION_API_SECRET: `extension api secret`
    - EXTENSION_BASE_URL: `ngrok url`
    - BACKEND_PORT: `port of backend application. defaults to 8080`
    - FRONTEND_PORT: `port of frontend application. defaults to 8081`


### Project setup

### Install dependencies
Install backend dependency
Using yarn:
```
yarn install
```
Using npm:
```
npm install
```

Install frontend dependency
Using yarn:
```
yarn install --cwd ./web
```
Using npm:
```
npm install --prefix ./web
```


### Local development
Starts the local server in watch mode, meaning it will automatically restart when changes are detected.

Using yarn:
```
yarn run start:dev
```
Using npm:
```
npm run start:dev
```

### Start production server

Using yarn:
```
yarn run start:prod
```
Using npm:
```
npm run start:prod
```

### Serve frontend
Serves the frontend of the application in watch mode, automatically refreshing when changes are made.

Using yarn:
```
cd web && yarn run serve
```
Using npm:
```
cd web && npm run serve
```

### Backend API Proxying

When developing your application, the Vite development server is configured to handle API requests through a proxy. This setup forwards API calls to a backend server, specified by the     `BACKEND_PORT` environment variable, ensuring a smooth integration between your frontend and backend during development.

### Proxy Configuration

The Vite development server uses the following proxy configuration to direct API requests:
```
const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
}
```

### Build
Compiles the application for production.

Using yarn:
```
cd web && yarn run build
```
Using npm:
```
cd web && npm run build
```

### Lints and fixes files
Checks for linting errors and automatically fixes them if possible.

Using yarn:
```
cd web && yarn run lint
```
Using npm
```
cd web && npm run lint
```

### Testing
**Test backend**

Using yarn
```
yarn run test
```
Using npm
```
npm run test
```

**Test Frontend**

Using yarn
```
cd web && yarn run test
```
Using npm
```
cd web && npm run test
```

### Tech Stack
1. [fdk-client-javascript](https://github.com/gofynd/fdk-client-javascript): This library contains all the methods to call Fynd platform APIs.
2. [fdk-extension-javascript](https://github.com/gofynd/fdk-extension-javascript): This library streamlines the setup of authentication for accessing Fynd Platform APIs. It also simplifies the process of subscribing to webhooks for receiving real-time notifications.


[coveralls-badge]: https://coveralls.io/repos/github/gofynd/example-extension-javascript/badge.svg?branch=fpco-38359-test-case-setup&&kill_cache=1
[coveralls-url]: https://coveralls.io/github/gofynd/example-extension-javascript?branch=fpco-38359-test-case-setup