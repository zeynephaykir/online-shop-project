import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const WishlistScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const { data } = await axios.get('/api/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setWishlist(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlistItems();
  }, [userInfo.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Wishlist</h1>
      <Row xs={1} md={5} className="g-4">
        {wishlist.map((item) => {
          const discountedPrice = item.price - item.price * (item.discount / 100);
          return (
            <Col key={item._id}>
              <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${discountedPrice.toFixed(2)} {item.discount > 0 && <><del className="ml-2">${item.price}</del><span className="ml-2 badge badge-danger">{item.discount}% OFF</span></>}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/product/${item.slug}`)}>
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WishlistScreen;
