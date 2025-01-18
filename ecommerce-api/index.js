const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Import the Product model

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
// GET all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// POST a new product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body); // req.body should contain { name, photo, description }
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error adding product' });
  }
});

// GET a specific product by name
app.get('/products/:name', async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name }); // Find by product name
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// PUT to update a product by name
app.put('/products/:name', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { name: req.params.name }, // Find by product name
      req.body, // Update with the data from the request body
      { new: true } // Return the updated product
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

// DELETE a product by name
app.delete('/products/:name', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ name: req.params.name }); // Delete by product name
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
