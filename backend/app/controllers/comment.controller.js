const db = require("../models");
const Comment = db.comment;
const Post = db.post;
const User = db.user;

// Create and Save a new Comment
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
            message: "Le contenu ne peut être vide !"
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
                        message: "Impossible de trouver le commentaire avec l'id = " + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue pendant la création du commentaire."
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
                message: err.message || "Une erreur est survenue pendant la recherche des commentaires."
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
                message: "Impossible de trouver le commentaire avec l'id = " + id
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
                    message: "Le commentaire a bien été supprimé !"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le commentaire avec l'id = ${id}. Peut être que le commentaire n'a pas été trouvé.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le commentaire avec l'id = " + id
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
                message: `${nums} commentaires ont été supprimés avec succès !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue pendant la suppression des commentaires."
            });
        });
};