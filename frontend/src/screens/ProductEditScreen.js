import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const isSalesManager = userInfo.role && userInfo.role === 'sales manager';
  const isProductManager = userInfo.role && userInfo.role === 'product manager';
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
      useReducer(reducer, {
        loading: true,
        error: '',
      });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/products/${productId}`);
      setName(data.name);
      setSlug(data.slug);
      setPrice(data.price);
      setImage(data.image);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setBrand(data.brand);
      setDescription(data.description);
      setDiscount(data.discount);
      dispatch({ type: 'FETCH_SUCCESS' });
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_REQUEST' });
    await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
          discount,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
    );
    dispatch({
      type: 'UPDATE_SUCCESS',
    });
    toast.success('Product updated successfully');
    navigate('/admin/products');
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    dispatch({ type: 'UPLOAD_REQUEST' });
    const { data } = await axios.post('/api/upload', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: 'UPLOAD_SUCCESS' });
    toast.success('Image uploaded successfully');
    setImage(data.secure_url);
  };

  return (
      <Container className="small-container">
        <Helmet>
          <title>Edit Product {productId}</title>
        </Helmet>
        <h1>Edit Product {productId}</h1>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    value={name}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                    value={slug}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Price</Form.Label>
                {isSalesManager ? (
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                ) : (
                    <Form.Control
                        value={price}
                        disabled
                        required
                    />
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="imageFile">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" disabled />
                {loadingUpload && <LoadingBox></LoadingBox>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image File</Form.Label>
                <Form.Control
                    value={image}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    value={category}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    value={brand}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                {isProductManager ? (
                    <Form.Control
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                    />
                ) : (
                    <Form.Control
                        value={countInStock}
                        disabled
                        required
                    />
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    value={description}
                    disabled
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                />
              </Form.Group>
              <div className="mb-3">
                <Button disabled={loadingUpdate} type="submit">
                  Update
                </Button>
                {loadingUpdate && <LoadingBox></LoadingBox>}
              </div>
            </Form>
        )}
      </Container>
  );
}