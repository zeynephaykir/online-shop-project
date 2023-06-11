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
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';

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
    case 'ADD_TO_CART':
      return { ...state, isAddedToCart: true };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, isAddedToWishlist, isAddedToCart }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
    isAddedToWishlist: false,
    isAddedToCart: false,
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
  const { wishlist, cart } = state;

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
      navigate('/wishlist');
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state?.userInfo?.token}`,
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
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={product.image} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Badge pill bg="primary" className="ms-2">
                  #{product.rank}
                </Badge>
              </Card.Text>
              <Card.Text as="h4">
                {product.discount > 0 ? (
                  <>
                    <del>${product.price.toFixed(2)}</del>
                    <span className="ms-2">${discountedPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <>${product.price.toFixed(2)}</>
                )}
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToWishlistHandler} variant="outline-primary" disabled={isAddedToWishlist}>
                    <FaRegHeart size={20} /> {isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToCartHandler} variant="outline-primary" disabled={isAddedToCart}>
                    <FaShoppingCart size={20} /> {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
