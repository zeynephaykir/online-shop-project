import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
