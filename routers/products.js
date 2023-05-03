const express = require("express");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = file.originalname.split(" ").join("-");
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    // let filter = {};
    // if(req.query.categories){
    //     filter =  {category: req.query.categories.split(',')}
    // }

    const productList = await Product.find().populate("category");
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
router.post(`/`, uploadOptions.single("image"), async (req, res) => {
    // solution to non existent category id
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send("invalid category");
    }

    const file = req.file;
    if (!file) {
        return res.status(400).send("no image in the request");
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        model: req.body.model,
        image: `${basePath}${fileName}`,
        images: req.body.images,
        price: req.body.price,
        category: req.body.category, //what if categoryid does not exist?
        warrantyStatus: req.body.warrantyStatus,
        countInStock: req.body.countInStock,
        distributor: req.body.distributor,
        feedback: req.body.feedback,
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

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            model: req.body.model,
           // image: `${basePath}${fileName}`,
            images: req.body.images,
            price: req.body.price,
            category: req.body.category, //what if categoryid does not exist?
            warrantyStatus: req.body.warrantyStatus,
            countInStock: req.body.countInStock,
            distributor: req.body.distributor,
            feedback: req.body.feedback,
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
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({
        isFeatured: true,
    }).limit(+count);

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.put(
    "/gallery-images/:id",
    uploadOptions.array("images", 10),
    async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("invalid product id");
        }
        const files = req.files;

        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

        if (files) {
            files.map((file) => {
                imagesPaths.push(`${basePath}${file.filename}`);
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths,
            },
            { new: true } // to return the updated field
        );

        if (!product) {
            return res.status(400).send("product cannot be updated");
        }

        res.send(product);
    }
);

module.exports = router;
