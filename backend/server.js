const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/user.routes.js")(app);
require("./app/routes/post.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
