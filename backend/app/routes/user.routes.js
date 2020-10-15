// module.exports = app => {
//     const express = require('express');
//     const users = require("../controllers/user.controller.js");
  
//     const router = express.Router();
  
//     // Create a new user
//     router.post("/", users.create);
    
//     // Retrieve all users
//     router.get("/", users.findAll);

//     // Retrieve a single user with id
//     router.get("/:id", users.findOne);
  
//     // Update a user with id
//     router.put("/:id", users.update);
  
//     // Delete a user with id
//     router.delete("/:id", users.delete);
  
//     app.use('/api/users', router);
//   };

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", controller.allAccess);

  app.get(
    "/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
