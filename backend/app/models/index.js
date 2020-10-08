'use strict'
require('dotenv').config();
const Sequelize = require('sequelize'); 

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.posts = require('../models/post.model.js')(sequelize, Sequelize);

//Relations
//db.comments.belongsTo(db.posts);
//db.posts.belongsTo(db.users);
//db.users.hasMany(db.posts);

module.exports = db;