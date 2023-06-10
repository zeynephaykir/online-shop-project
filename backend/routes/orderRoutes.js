import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Wishlist from '../models/wishlistModel.js';
import { isAuth } from '../utils.js';

const wishlistRouter = express.Router();

wishlistRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      res.send(wishlist.products);
    } else {
      res.status(404).send({ message: 'Wishlist Not Found' });
    }
  })
);

wishlistRouter.post(
  '/add/:productId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      const { productId } = req.params;
      if (wishlist.products.includes(productId)) {
        res.status(400).send({ message: 'Product already in wishlist' });
      } else {
        wishlist.products.push(productId);
        await wishlist.save();
        res.status(201).send({ message: 'Product added to wishlist' });
      }
    } else {
      const newWishlist = new Wishlist({
        user: req.user._id,
        products: [req.params.productId],
      });
      await newWishlist.save();
      res.status(201).send({ message: 'Product added to wishlist' });
    }
  })
);

wishlistRouter.delete(
  '/remove/:productId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      const { productId } = req.params;
      wishlist.products = wishlist.products.filter(
        (product) => product !== productId
      );
      await wishlist.save();
      res.send({ message: 'Product removed from wishlist' });
    } else {
      res.status(404).send({ message: 'Wishlist Not Found' });
    }
  })
);

export default wishlistRouter;
