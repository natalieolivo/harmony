const jwt = require("jsonwebtoken");
const secret = require("../config/env.config.js").jwt_secret;
const crypto = require("crypto");

exports.verifyRefreshBodyField = (request, response, next) => {
  if (request.body && request.body.refresh_token) {
    return next();
  } else {
    return response
      .status(400)
      .send({ error: "need to pass refresh_token field" });
  }
};

exports.validRefreshNeeded = (request, response, next) => {
  //   let b = new Buffer(request.body, "base64");
  //let b = new Buffer.from(request.body, "base64");
};
