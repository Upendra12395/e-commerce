const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address')

router.post('/addAddress', addressController.addAddress)
router.patch('/updateOne/:id', addressController.updateOne)
router.delete('/deleteOne/:id', addressController.deleteOne)
router.get('/showAll', addressController.showAll)
