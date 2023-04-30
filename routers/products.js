const express = require("express");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {

    // let filter = {};
    // if(req.query.categories){
    //     filter =  {category: req.query.categories.split(',')}
    // }

    const productList = await Product.find();
    //const productList = await Product.find({category: filter}).populate('category')

    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
});

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});

//without middleware, this request returns as undefined in the console
router.post(`/`, async (req, res) => {
    //solution to non existent category id
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send("invalid category");
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category, //what if categoryid does not exist?
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    product = await product.save();

    if (!product) {
        return res.status(500).send("the product cannot be created!");
    }

    res.send(product);
});

router.put(`/:id`, async (req, res) => {
    //to validate id to prevent crash
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("invalid product id");
    }

    //solution to non existent category id
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send("invalid category");
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category, //what if categoryid does not exist?
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true } // to return the updated field
    );

    if (!product) {
        return res.status(400).send("product cannot be updated");
    }

    res.send(product);
});

router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "the product has been deleted successfully",
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "product not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({
        isFeatured: true,
    }).limit(+count);

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

module.exports = router;
