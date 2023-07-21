const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');




/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.get('/', auth, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Get a user by id
 *     responses:
 *        '200':
 *           description: A successful response
 */
router.get('/:id', auth, userController.getUser);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = router;
