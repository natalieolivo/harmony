const crypto = require("crypto");
const UserModel = require("../models/users.model");

exports.insert = (request, response) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(request.body.password)
    .digest("base64");

  request.body.password = salt = "$" + hash;
  request.body.permissionLevel = 1;

  UserModel.createUser(request.body).then(result => {
    response.status(201).send({ id: result._id });
  });

  console.log("salty", request.body.password);
};
