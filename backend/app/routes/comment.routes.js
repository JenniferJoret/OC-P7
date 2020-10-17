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
  app.post("/api/posts/:id/", posts.create);

  // Retrieve all Posts
  app.get("/api/posts/", posts.findAll);

  // Retrieve a single Post with id
  app.get("/api/posts/:id", posts.findOne);

  // Update a Post with id
  app.put("/api/posts/:id", posts.update);

  // Delete a Post with id
  app.delete("/api/posts/:id", posts.delete);

  // Delete all Posts
  app.delete("/api/posts/", posts.deleteAll);

};
