const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', auth, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:userId', auth, userController.getUser);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
