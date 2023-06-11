import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function Product(props) {
  const { product } = props;

  // Use the product discount value
  const discountedPrice = product.price - (product.price * product.discount / 100);

  const { state, dispatch} = useContext(Store);
  const {
    cart: { cartItems },
    wishlist: { wishlistItems },
  } = state;

  // const wishlistItems = wishlist?.wishlistItems || [];
  const [isInWishlist, setIsInWishlist] = useState(wishlistItems.some((item) => item._id === product._id));

  useEffect(() => {
    setIsInWishlist(wishlistItems.some((item) => item._id === product._id));
  }, [wishlistItems, product._id]);


  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const addToWishlistHandler = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/wishlist`, { productId }, config);
      await dispatch({ type: 'ADD_TO_WISHLIST', payload: data });
      setIsInWishlist(true);
      console.log('Product added to wishlist');
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductFromWishlist = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };
      await axios.delete(`/api/wishlist/${productId}`, config);
      await dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
      setIsInWishlist(false);
      console.log('Product removed from wishlist');
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Card>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>
            {product.discount === 0 ? (
                <strong>${product.price}</strong>
            ) : (
                <div>
                  <strong>${discountedPrice.toFixed(2)}</strong> <del>${product.price}</del>
                  <span className="badge bg-success">{product.discount}% off</span>
                </div>
            )}
          </Card.Text>
          {product.countInStock === 0 ? (
              <Button variant="light" disabled>
                Out of stock
              </Button>
          ) : (
              <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
          )}
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            {isInWishlist ? (
                <Button variant="link" onClick={() => removeProductFromWishlist(product._id)}>
                  <FaHeart />
                </Button>
            ) : (
                <Button variant="link" onClick={() => addToWishlistHandler(product._id)}>
                  <FaHeart />
                </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
  );
}
export default Product;