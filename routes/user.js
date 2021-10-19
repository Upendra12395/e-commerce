const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')

router.post('/signIn', userController.signIn)
router.post('/logIn', userController.logIn)
router.get('/', userController.getUser)

module.exports = router