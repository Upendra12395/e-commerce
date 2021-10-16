const express = require('express')
const router = express.Router();
const productController = require('../controllers/product')

router.get('/', productController.getAll)
router.get('/getBill', productController.getBill)
router.post('/addProduct', productController.addProduct)
router.get('/:id', productController.getOne)
router.patch('/:id', productController.updateOne)
router.delete('/:id', productController.deleteOne)



module.exports = router