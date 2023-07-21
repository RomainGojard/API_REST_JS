const User = require('../models/User');

exports.getAllUsers = (req, res) => {
   User.find()
   .then(users => res.json(users))
   .catch(err => res.status(500).json({ error: err }));
};
