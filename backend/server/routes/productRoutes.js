const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add new product
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, image } = req.body;

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Name, category, and price are required fields' });
    }

    // Parse and validate the price to ensure it's a valid number
    const parsedPrice = parseFloat(price);  // Use parseFloat() to handle decimal numbers

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: 'Price must be a valid number' });
    }

    // Create new product
    const product = new Product({ 
      name, 
      category,
       
     
      price: parsedPrice,  // Ensure price is a number
   
      image: image || '',   // Handle optional imageUrl
     

    });

    // Save product to database
    const savedProduct = await product.save();

    res.status(201).json({ 
      success: true,
      message: 'Product added successfully',
      product: savedProduct 
    });
  } catch (error) {
    console.error('Error adding product:', error);

    // More specific error messages
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ 
      error: 'Failed to add product',
      details: "yathin"
    });
  }
});

// Get all products
// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to fetch products',
//       details: error.message
//     });
//   }
// });

module.exports = router;