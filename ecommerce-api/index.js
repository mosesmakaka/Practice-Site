const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection string
const DB_CONNECTION_STRING = "mongodb://127.0.0.1:27017/ecommerce";

mongoose
  .connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API!");
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// Add a new product
app.post("/products", async (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = new Product({ name, price, description });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
