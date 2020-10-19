const {
  verifySignUp
} = require("../middleware");
const auth = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Sign Up
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkRolesExisted
    ],
    auth.signup
  );

  // Sign In
  app.post("/api/auth/signin", auth.signin);

  // Delete a user with id
  app.delete("/api/auth/delete/:id", auth.delete);

};