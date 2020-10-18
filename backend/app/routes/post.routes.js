const {
  authJwt
} = require("../middleware");
const posts = require("../controllers/post.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Post
  app.post("/api/posts/", [authJwt.verifyToken], posts.create);

  // Retrieve all Posts
  app.get("/api/posts/", [authJwt.verifyToken], posts.findAll);

  // Retrieve a single Post with id
  app.get("/api/posts/:id", [authJwt.verifyToken], posts.findOne);

  // Update a Post with id
  app.put("/api/posts/:id", [authJwt.verifyToken], posts.update);

  // Update a Post with like
  app.put("/api/posts/:id/like", [authJwt.verifyToken], posts.likePost);

  // Delete a Post with id
  app.delete("/api/posts/:id", [authJwt.verifyToken], posts.delete);

};