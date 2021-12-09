const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/AuthController');
const verifyToken = require('../controllers/middleware/VerifyTokenMiddleware');

authRoutes.post('/auth/login', authController.login);
authRoutes.post('/auth/register', authController.register);
authRoutes.get('/auth/user-profile', verifyToken, authController.getUserLogin);
authRoutes.get('/user', verifyToken, authController.getUser);
authRoutes.post('/delete-user',  verifyToken, authController.deleteUser);
authRoutes.post('/auth/logout', verifyToken, authController.logout);

module.exports = authRoutes;