const jwtSecret = require("../../common/config/env.config").jwt_secret;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = (request, response) => {
  try {
    let refreshId = request.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    request.body.refreshKey = salt;
    let token = jwt.sign(request.body, jwtSecret);
    let b = new Buffer(hash);
    let refresh_token = b.toString("base64");
    response
      .status(201)
      .send({
        email: request.body.email,
        accessToken: token,
        refreshToken: refresh_token
      });
  } catch (error) {
    response.status(500).send({ errors: error });
  }
};
