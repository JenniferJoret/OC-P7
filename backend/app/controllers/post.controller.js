const db = require("../models");
const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Post
  const post = {
    user_id: "1",
    title: req.body.title,
    content: req.body.content
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      [Op.like]: `%${title}%`
    }
  } : null;

  Post.findAll({ where: condition,
      include: [{
        model: User
      }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id,{
      include: [{
        model: User
      }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Post.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res, next) => {
  Post.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts."
      });
    });
};