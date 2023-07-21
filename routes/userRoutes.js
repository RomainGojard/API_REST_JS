const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
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
 *   get:
 *     description: Get all users
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.get('/users', auth, userController.getAllUsers);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = router;
