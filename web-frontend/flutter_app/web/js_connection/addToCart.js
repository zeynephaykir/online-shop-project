let cartList = {};

function addToCart(product) {
    // If the product is already in the cart, increase the quantity by 1
    if (cartList[product.id]) {
        cartList[product.id].quantity += 1;
    } else {
        // Otherwise, add the product to the cart with a quantity of 1
        cartList[product.id] = {
            name: product.name,
            price: product.price,
            quantity: 1,
        };
    }
}
module.exports = addToCart;
