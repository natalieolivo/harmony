module.exports = {
  port: process.env.port || 9999,
  appEndpoint: "http://localhost:9999",
  apiEndpoint: "http://localhost:9999",
  jwt_secret: "s3cr3t",
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048
  }
};
