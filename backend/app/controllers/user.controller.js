exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userConnect = (req, res) => {
  res.status(200);
};

exports.adminConnect = (req, res) => {
  res.status(200);
};


