const { authJwt } = require("../middleware");
const comments = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   // Create a new comment
  app.post("/api/posts/:id/comment",[authJwt.verifyToken], comments.create);

   // Retrieve a single comment with id
  app.get("/api/posts/:id/comments",[authJwt.verifyToken], comments.findAll);

  // // Update a comment with id
   app.put("/api/posts/:id/comment",[authJwt.verifyToken], comments.update);

   // Delete a comment with id
   app.delete("/api/posts/:idPost/comment/:idComment",[authJwt.verifyToken], comments.delete);
};
