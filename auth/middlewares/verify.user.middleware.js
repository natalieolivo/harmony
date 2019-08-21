const UserModel = require("../../users/models/users.model");
const crypto = require("crypto");

exports.hasAuthValidFields = (request, response, next) => {
  let errors = [];

  if (request.body) {
    if (!request.body.email) {
      errors.push("Missing email field");
    }
    if (!request.body.password) {
      errors.push("Missing password field");
    }
    if (errors.length) {
      return response.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return response
      .status(400)
      .send({ errors: "Missing email and password fields" });
  }
};

exports.isPasswordAndUserMatch = (request, response, next) => {
  UserModel.findByEmail(request.body.email).then(user => {
    if (!user[0]) {
      response.status(404).send({}); // why do I need an empty object here?
    } else {
      let passwordFields = user[0].password.split("$");
      let salt = crypto.randomBytes(16).toString("base64");
      let hash = crypto
        .createHmac("sha512", salt)
        .update(request.body.password)
        .digest("base64");

      if (hash === passwordFields[1]) {
        request.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          provider: "email",
          name: user[0].firstName + +user[0].lastName
        };
        return next();
      } else {
        return response
          .status(404)
          .send({ errors: ["Invalid email or password"] });
      }
    }
  });
};
