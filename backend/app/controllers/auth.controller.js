const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


// const crypto = require('crypto');
// On définit la fonction de cryptage (email)
// function mailCrypt(req) {
//     const algorithm = process.env.CIPHER_ALGORITHM;
//     const ckey = process.env.CIPHER_KEY;
//     const key = crypto.createHash('sha256').update(String(ckey)).digest('base64').substr(0, 32);
//     const iv = Buffer.alloc(16);

//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let mailCrypted = cipher.update(req.body.email, 'utf8', 'hex');
//     mailCrypted += cipher.final('hex');
//     return mailCrypted;
// }


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Inscription réussie !" });
        }).then(user => {
          var token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
            expiresIn: 86400 // 24 hours
          });
    
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              roles: authorities,
              accessToken: token
            });
          });

        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Il n'y a personne d'inscrit avec cette adresse mail." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe érroné !"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};