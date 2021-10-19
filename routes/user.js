const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const userMiddleware = require('../middleware/user')

router.post('/signIn', userController.signIn)
router.post('/logIn', userController.logIn)
router.get('/', userMiddleware.userAuth, userController.getUser)

module.exports = router