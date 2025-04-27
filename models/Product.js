const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  description: { 
    type: String,
    required: true 
  },
  images: { 
    type: [String],
    required: true 
  },
  category: { 
    type: String,
    enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios', 'Vestidos'], 
    required: true 
  },
  size: { 
    type: [String], 
    required: true,
    validate: {
      validator: function(sizes) {
        const validSizes = {
          'Zapatos': ['38', '39', '40', '41', '42', '43', '44'],
          'Camisetas': ['XS', 'S', 'M', 'L', 'XL'],
          'Pantalones': ['XS', 'S', 'M', 'L', 'XL'],
          'Vestidos': ['XS', 'S', 'M', 'L', 'XL'],
          'Accesorios': ['Único']
        };

        const category = this.category;  // Usamos 'this.category' para acceder a la categoría

        if (!category) return false; // Si no tiene categoría, devolvemos false

        // Validamos que todas las tallas sean correctas para la categoría
        return sizes.every(size => validSizes[category]?.includes(size));
      },
      message: function(props) {
        const category = this.category;  // Usamos 'this.category' para acceder a la categoría
        return `Al menos una talla no es válida para la categoría ${category || 'desconocida'}.`;
      }
    }
  },
  price: { 
    type: Number, 
    required: true 
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
