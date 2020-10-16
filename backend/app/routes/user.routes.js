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
    user.userBoard
  );

  app.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    user.moderatorBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.adminBoard
  );
};
