const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');
const { verifyToken, isModerator, isAdmin } = require('../middleware/authjwt');

// Rutas para productos
router.post('/', [verifyToken, isModerator], ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', [verifyToken, isAdmin], ProductController.updateProductById); 
router.delete('/:productId', [verifyToken, isAdmin], ProductController.deleteProductById); 

module.exports = router;