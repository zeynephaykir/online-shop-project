import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
     await Product.deleteOne();
     const createdProducts = await Product.insertMany(data.products);

    await User.deleteOne();
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});
export default seedRouter;
 