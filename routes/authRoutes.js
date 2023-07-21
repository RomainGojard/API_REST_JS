const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController')


/**
 * @swagger
 * /api/users:
 *   post:
 *     description: login route
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: signup route
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.post('/signup', authController.signup);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


module.exports = router;
