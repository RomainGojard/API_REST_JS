const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login',auth, authController.login);
router.get('/users',auth, userController.getAllUsers);

module.exports = router;
