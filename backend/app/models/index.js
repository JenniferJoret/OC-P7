// 'use strict'
// require('dotenv').config();
// const Sequelize = require('sequelize'); 

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   dialect: process.env.DATABASE_DIALECT,
//   define: {
//     underscored: true
//   }
// });

// // Connect all the models/tables in the database to a db object, 
// //so everything is accessible via one object
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// //Models/tables
// db.users = require('../models/user.model.js')(sequelize, Sequelize);
// db.comments = require('../models/comments.model.js')(sequelize, Sequelize);
// db.posts = require('../models/post.model.js')(sequelize, Sequelize);

// //Relations
// db.comments.belongsTo(db.posts);
// db.posts.hasMany(db.comments);
// db.posts.belongsTo(db.users);
// db.users.hasMany(db.posts);


// module.exports = db;

require('dotenv').config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      useUTC: true, //for reading from database
      dateStrings: true,
    },
    timezone: 'Europe/Paris',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);

db.post.belongsTo(db.user);
db.user.hasMany(db.post);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
