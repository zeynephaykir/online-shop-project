import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

const WishlistScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {wishlist.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name} />
          <h3>{item.price}</h3>
        </div>
      ))}
    </div>
  );
};

export default WishlistScreen;
