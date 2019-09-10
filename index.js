const config = require("./common/config/env.config.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AuthorizationRouter = require("./auth/routes.config");
const port = config.port;
const UsersRouter = require("./users/routes.config");

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );

  if (request.method === "OPTIONS") {
    return response.send(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(port, () => console.log(`listening on port ${port}`));
