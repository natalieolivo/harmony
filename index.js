const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 6000;
const model = require("./users/models/users.model");

const UsersRouter = require("./users/routes.config");

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  next();
  // what is an options request?
  //   if (request.method === "OPTIONS") {
  //     return response.send(200); // why am I returning 200 here?
  //   } else {
  //     return next(); // what does this do?
  //   }
});

app.use(bodyParser.json());
//AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(port, () => console.log(`listening on port ${port}`));
