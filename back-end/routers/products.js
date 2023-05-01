const express = require('express');
const router = express.Router();

const Product = require('../models/products');

//---inserts into database by Post method---
router.post(`/`, (req, res) => {
    const product = new Product({
        category: req.body.category,
        description: req.body.description,
        distributor_info: req.body.distributor_info,
        model: req.body.model,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating,
        stock: req.body.stock,
        warranty_status: req.body.warranty_status,
    });

    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

router.get('/', (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

// Search products by name or description
router.get('/search', (req, res) => {
    const searchTerm = req.query.q;

    // Find products that match the search term in either the name or description
    Product.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

module.exports = router;
