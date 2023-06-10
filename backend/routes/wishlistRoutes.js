import express from "express";
import expressAsyncHandler from 'express-async-handler';
import Wishlist from "../models/wishlistModel.js";
import { isAuth } from '../utils.js';

const wishlistRouter = express.Router();

wishlistRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (wishlist) {
    res.send(wishlist.products);
  } else {
    res.send([]);
  }
}));

wishlistRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    // Wishlist exists for user, add the product to the wishlist
    if (wishlist.products.includes(productId)) {
      res.status(400).send({ message: 'Product already exists in the wishlist' });
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      res.status(201).send({ message: 'Product added to the wishlist' });
    }
  } else {
    // Wishlist does not exist for user, create a new wishlist and add the product
    const newWishlist = new Wishlist({
      user: userId,
      products: [productId],
    });
    await newWishlist.save();
    res.status(201).send({ message: 'Product added to the wishlist' });
  }
}));

wishlistRouter.delete('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    // Wishlist exists for user, remove the product from the wishlist
    wishlist.products.pull(id);
    await wishlist.save();
    res.send({ message: 'Product removed from the wishlist' });
  } else {
    res.status(404).send({ message: 'Wishlist not found' });
  }
}));

export default wishlistRouter;
