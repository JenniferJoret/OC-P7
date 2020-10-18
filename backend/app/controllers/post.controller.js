const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const Sequelize = db.Sequelize;

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

    Post.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            attributes: {
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentsCount"]
                ]
            },
            include: [{
                    model: Comment,
                    attributes: []
                },
                {
                    model: User
                }
            ],
            group: ['posts.id']
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
    Post.findByPk(id)
        .then(post => {
            post.title = req.body.title;
            post.content = req.body.content;
            post.save()
            res.send(post);
        })
};

// Delete a Post with the specified id in the request
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Comment.destroy({
        where: {
            post_id: id
        }
    });
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

exports.likePost = (req, res, next) => {
    const id = req.params.id;
    const like = req.body.like;
    Post.findByPk(id, {
        include: [{
            model: User
        }]
    }).then(post => {
        const likes = post.usersLiked.split(',');
        const dislikes = post.usersDisliked.split(',');
        if (like == 1) {
            console.log('Vote positif !')
            likes.push(req.body.userId);
            const strLikes = likes.join();
            post.usersLiked = strLikes;
            if (dislikes.includes(req.body.userId.toString())) {
                dislikes.splice(dislikes.indexOf(req.body.userId.toString()), 1)
                const strLikes = dislikes.join();
                post.usersDisliked = strLikes;
            }
            post.save()
            res.send(post);
        } else if (like == 0) {

            if (likes.includes(req.body.userId.toString())) {
                likes.splice(likes.indexOf(req.body.userId.toString()), 1)
                const strLikes = likes.join();
                post.usersLiked = strLikes;
            }
            if (dislikes.includes(req.body.userId.toString())) {
                dislikes.splice(dislikes.indexOf(req.body.userId.toString()), 1)
                const strLikes = dislikes.join();
                post.usersDisliked = strLikes;
            }
            post.save()
            res.send(post);
            console.log('Vote réinitialisé !')
        } else if (like == -1) {
            if (likes.includes(req.body.userId.toString())) {
                likes.splice(likes.indexOf(req.body.userId.toString()), 1)
                const strLikes = likes.join();
                post.usersLiked = strLikes;
            }
            console.log('Vote positif !')
            const dislikes = post.getDataValue('usersDisliked').split(',');
            dislikes.push(req.body.userId);
            const strDislikes = dislikes.toString();
            post.usersDisliked = strDislikes;
            post.save()
            res.send(post);
        }
    })
}