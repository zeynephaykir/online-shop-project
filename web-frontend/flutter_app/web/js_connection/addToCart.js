   function addToCart(productId, quantity) {
    fetch('http://localhost:3000/api/v1/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Display a success message to the user
        alert('Item added to cart successfully!');
      } else {
        // Display an error message to the user
        alert('An error occurred while adding the item to the cart.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the item to the cart.');
    });
  }

  function getCartItems() {
    fetch('http://localhost:3000/api/v1/cart')
      .then(response => {
        if (response.ok) {
          // Parse the JSON response
          return response.json();
        } else {
          // Display an error message to the user
          alert('An error occurred while fetching the cart items.');
        }
      })
      .then(cartItems => {
        // Display the cart items to the user
        console.log('Cart items:', cartItems);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching the cart items.');
      });
  }
  
  