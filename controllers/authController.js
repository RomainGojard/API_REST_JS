const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
       bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
 
          if (isMatch) {
             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });
             res.json({ token });
          } else {
             res.status(400).json({ error: 'Incorrect password' });
          }
       });
    })
    .catch(err => res.status(500).json({ error: err }));
 };
