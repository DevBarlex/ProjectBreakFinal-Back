const Product = require('../models/Product'); // Asegúrate de que la ruta al modelo sea correcta

const ProductController = {
  async createProduct(req, res) {
    try {
      const {name, description, images, category, size, price, } = req.body
      const newProduct = new Product({name, description, images, category, size, price, })
      const productSaved = await newProduct.save()
      res.status(201).json(productSaved);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create product', details: error.message }); // Send detailed error
    }
  },

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
    }
  },


  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
    }
  },

  async updateProductById(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { 
        new: true, 
        runValidators: true,
        context: 'query'
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
  },
  async deleteProductById(req, res) {
    try {
      const {productId} = req.params
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product with that id not found" });
      }
      res.status(201).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
  }
};

module.exports = ProductController;