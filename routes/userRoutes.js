const express = require('express');
const router = express.Router();
const createUser = require('../controllers/usersController')
const {verifyToken, isAdmin} = require('../middleware/authjwt')
const {checkRolesExisted} = require('../middleware/verifySignUp')

router.post('/', [verifyToken, isAdmin], checkRolesExisted, createUser)


module.exports = router