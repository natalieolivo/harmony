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
  let b = new Buffer.from(request.body.refresh_token, "base64");
  let refresh_token = b.toString();
  let hash = crypto
    .createHmac("sha512", request.jwt.refreshKey)
    .update(request.jwt.userId + secret)
    .digest("base64");
  if (hash === refresh_token) {
    request.body = request.jwt;
    return next();
  } else {
    return response.status(400).send({ error: "Invalid refresh token" });
  }
};

exports.validJWTNeeded = (request, response, next) => {
  if (request.headers["authorization"]) {
    // why is the try catch used here?
    try {
      let authorization = request.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return response.status(404).send({});
      } else {
        request.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (error) {
      return response.status(403).send();
    }
  }
};
