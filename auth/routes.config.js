const VerifyUserMiddleware = require("../auth/middlewares/verify.user.middleware");
const AuthorizationController = require("../auth/controllers/authorization.controller");
const AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

exports.routesConfig = app => {
  app.post("/auth", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login
  ]);
};
