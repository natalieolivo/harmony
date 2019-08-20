const UsersController = require("./controllers/users.controller");

exports.routesConfig = function(app) {
  // create a new user
  app.post("/users", [UsersController.insert]);

  // get a list of users
  app.get("/users", [UsersController.list]);

  // check if a user exists via the userId
  app.get("/users/:userId", [UsersController.getById]);

  // update specific fields on a user
  app.patch("/users/:userId", [UsersController.patchById]);

  app.delete("/users/:userId", [UsersController.deleteOneById]);
};
