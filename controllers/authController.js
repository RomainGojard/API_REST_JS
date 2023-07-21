const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Incorrect password' });
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(409).json({ error: 'Email already taken' });
      }
        const newUser = new User({
          name,
          email,
          password: password
        });

        newUser.save()
        .then(savedUser => {
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        })
        .catch(saveErr => {
        console.error('Error saving user:', saveErr); // Ajout du gestionnaire d'erreur personnalisé
        res.status(500).json({ error: 'Error saving user to the database' });
        });
    })
    .catch(err => res.status(500).json({ error: err }));
};
