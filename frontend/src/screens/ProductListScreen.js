import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import { FaRegHeart, FaHeartBroken, FaCartPlus } from 'react-icons/fa';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TO_WISHLIST':
      return { ...state, isAddedToWishlist: true };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, isAddedToWishlist: false };
    default:
      return state;
  }
};

function ProductListScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, isAddedToWishlist }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
    isAddedToWishlist: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { wishlist } = state;

  const addToWishlistHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/wishlist`, { productId: product._id }, config);
      console.log(data);
      ctxDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlistHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/wishlist/${product._id}`, config);
      console.log(data);
      ctxDispatch({ type: 'REMOVE_FROM_WISHLIST' });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/cart`, { productId: product._id }, config);
      console.log(data);
      ctxDispatch({ type: 'ADD_TO_CART', payload: product });
      navigate('/cart');
    } catch (error) {
      console.log(error);
    }
  };

  const discountedPrice = product.price - product.price * (product.discount / 100);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${discountedPrice.toFixed(2)}{' '}
              {isAddedToWishlist ? (
                <Button variant="outline-danger" onClick={removeFromWishlistHandler}>
                  <FaHeartBroken className="mr-1" /> Remove from Wishlist
                </Button>
              ) : (
                <Button variant="outline-primary" onClick={addToWishlistHandler}>
                  <FaRegHeart className="mr-1" /> Add to Wishlist
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>
                    <strong>
                      ${discountedPrice.toFixed(2)}
                      {product.discount > 0 && (
                        <Badge variant="success" className="ml-2">
                          {product.discount}% off
                        </Badge>
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge variant="success">In Stock</Badge>
                    ) : (
                      <Badge variant="danger">Out of Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  <FaCartPlus className="mr-1" /> Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <h2>Description</h2>
          <p>{product.description}</p>
        </Col>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <MessageBox>No Reviews</MessageBox>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating}></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default ProductListScreen;
