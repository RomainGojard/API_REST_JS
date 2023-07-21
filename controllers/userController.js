const User = require("../models/User");

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ error: err }));
};
