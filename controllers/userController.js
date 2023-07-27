const User = require("../models/User");

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: 'Error fetching users' }));
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: 'Error fetching user' }));
};
