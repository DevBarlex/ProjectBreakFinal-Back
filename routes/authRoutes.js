const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {checkDuplicateUser, checkRolesExisted } =require('../middleware/verifySignUp')

// Ruta para login
router.post('/register', [checkDuplicateUser, checkRolesExisted], authController.register);
router.post('/login', authController.login);


module.exports = router;

