const UsersController = require("./controllers/users.controller");

// what does exports mean? Look this up
exports.routesConfig = function(app) {
  app.post("/users", [UsersController.insert]);
};
