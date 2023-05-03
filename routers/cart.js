const CartItem = require('./models/cartItem');

app.post('./api/v1/cart', (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const userId = req.user.id; // If you are using user authentication

  // Add the item to the cart in the database
  const cartItem = new CartItem({
    product: productId,
    quantity: quantity,
    user: userId
  });
  cartItem.save((error) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred while adding the item to the cart.');
    } else {
      res.send('Item added to cart.');
    }
  });
});

app.get('./api/v1/cart', (req, res) => {
  const userId = req.user.id; // If you are using user authentication

  // Find all cart items for the user
  CartItem.find({ user: userId })
    .populate('product')
    .exec((error, cartItems) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching the cart items.');
      } else {
        res.json(cartItems);
      }
    });
});
