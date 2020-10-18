const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", user.allAccess);

  app.get(
    "/user",
    [authJwt.verifyToken],
    user.userConnect
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.adminConnect
  );

};
