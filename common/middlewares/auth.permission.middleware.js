// const jwt = require("jsonwebtoken");
// const secret = require("../config/env.config.js").jwt_secret;
const ADMIN_PERMISSION = 4096; // why this number?

exports.minimumPermissionLevelRequired = required_permission_level => {
  return (request, response, next) => {
    let user_permission_level = parseInt(request.jwt.permissionLevel);
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return response.status(403).send();
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (request, response, next) => {
  let user_permission_level = parseInt(request.jwt.permissionLevel);
  let userId = request.jwt.userId;
  if (
    request.params &&
    request.params.userId &&
    userId === request.params.userId
  ) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return response.status(403).send();
    }
  }
};

exports.sameUserCantDoThisAction = (request, response, next) => {
  let userId = request.jwt.userId;

  if (request.params.userId !== userId) {
    return next();
  } else {
    return response.status(403).send();
  }
};
