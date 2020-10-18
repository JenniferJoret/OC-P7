const db = require("../models");
const Comment = db.comment;
const Post = db.post;
const User = db.user;

// Create and Save a new Comment
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Comment
    const comment = {
        user_id: req.body.userId,
        post_id: req.params.id,
        content: req.body.content
    };

    // Save Comment in the database
    Comment.create(comment)
        .then(data => {

            Comment.findOne({
                    where: {
                        id: data.id
                    },
                    include: [{
                        model: User
                    }]
                })

                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving Comment with id=" + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        });
};

// Retrieve all Comments from one post.
exports.findAll = (req, res, next) => {
    const postId = req.params.id;
    Comment.findAll({
            where: {
                post_id: postId
            },
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: User
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};

// Find a single Comment with an id (moderation)
exports.findOne = (req, res, next) => {
    const id = req.params.id;

    Comment.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comment with id=" + id
            });
        });
};

// Update a Comment by the id in the request
exports.update = (req, res, next) => {
    console.log(req.body)
    Comment.findByPk(req.body.commentId)
        .then(comment => {
            comment.content = req.body.content;
            comment.save()
            res.send(comment);
        })
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res, next) => {
    const id = req.params.idComment;

    Comment.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res, next) => {
    Comment.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Comments were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all comments."
            });
        });
};