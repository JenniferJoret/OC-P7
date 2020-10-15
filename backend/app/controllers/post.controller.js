const db = require("../models");
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Le contenu ne peut être vide !"
        });
        return;
    }

    // Create a Post
    const post = {
        user_id: req.body.userId,
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
                message: err.message || "Une erreur est survenue pendant la création du post."
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

    Post.findAll({
            where: condition,
            include: [{
                model: User
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue pendant la recherche des posts."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id, {
            include: [{
                model: User
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de retrouver le post avec l'id=" + id
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
                    message: "Le post a bien été mis à jour !"
                });
            } else {
                res.send({
                    message: `Impossible de mettre à jour le post avec l'id=${id}. Peut être que le post n'a pas été trouvé ou que le req.body est vide.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de mettre à jour le post avec l'id=" + id
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
                    message: "Le post a bien été supprimé !"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le post avec l'id=${id}. Peut être que le post n'a pas été trouvé.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le post avec l'id=" + id
            });
        });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} posts ont été supprimés avec succès !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue pendant la suppression des posts."
            });
        });
};