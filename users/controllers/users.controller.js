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
};

exports.getById = (request, response) => {
  UserModel.findById(request.params.userId).then(result => {
    response.status(200).send(result);
  });
};

exports.patchById = (request, response) => {
  if (request.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(request.body.password)
      .digest("base64");

    request.body.password = salt = "$" + hash;
  }
  UserModel.patchUser(request.params.userId, request.body).then(() => {
    response.status(204).send({});
  });
};

exports.list = (request, response) => {
  let limit =
    request.query.limit && request.query.limit <= 100
      ? parseInt(request.query.limit)
      : 10;
  let page = 0;

  if (request.query) {
    if (request.query.page) {
      request.query.page = parseInt(request.query.page);
      page = Number.isInteger(request.query.page) ? request.query.page : 0;
    }
  }
  UserModel.list(limit, page).then(result => {
    response.status(200).send(result);
  });
};

exports.deleteOneById = (request, response) => {
  UserModel.deleteOneById(request.params.userId).then(() => {
    response.status(204).send({});
  });
};
