import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
      useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
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
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
          `/api/products/${product._id}/reviews`,
          { rating, comment, name: userInfo.name },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
      );
      toast.success(data.message);
      dispatch({ type: 'CREATE_SUCCESS' });
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
      <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
              <Link to="/">Back to result</Link>
              <Row>
                <Col md={6}>
                  <img
                      className="img-large"
                      src={product.image}
                      alt={product.name}
                  ></img>
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
                      <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                      ></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Discount : {product.discount}%</ListGroup.Item>
                    <ListGroup.Item>Discounted Price : ${discountedPrice}</ListGroup.Item>
                    <ListGroup.Item>
                      Description:
                      <p>{product.description}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                                <Badge pill variant="success">
                                  In Stock
                                </Badge>
                            ) : (
                                <Badge pill variant="danger">
                                  Unavailable
                                </Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                            onClick={addToCartHandler}
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-4">
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                      <MessageBox>No Reviews</MessageBox>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating rating={review.rating}></Rating>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Write a Review</h2>
                      {loadingCreateReview && <LoadingBox></LoadingBox>}
                      {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <FloatingLabel
                                controlId="rating"
                                label="Rating"
                                className="mb-3"
                            >
                              <Form.Select
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very Good</option>
                                <option value="5">5- Excellent</option>
                              </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="comment"
                                label="Comment"
                                className="mb-3"
                            >
                              <Form.Control
                                  as="textarea"
                                  placeholder="Comment"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                              />
                            </FloatingLabel>
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
                          </Form>
                      ) : (
                          <MessageBox>
                            Please <Link to="/signin">Sign In</Link> to write a review
                          </MessageBox>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </div>
        )}
      </div>
  );
}

export default ProductScreen;