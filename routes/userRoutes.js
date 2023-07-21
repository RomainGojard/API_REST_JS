const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login',auth, authController.login);
router.get('/users',auth, userController.getAllUsers);

module.exports = router;
