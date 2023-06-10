import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'CreditCard'
  );
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const handleCardInfoChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    // Card number validation
    if (!/^\d{16}$/.test(cardInfo.cardNumber)) {
      alert("Please enter a valid card number.");
      return;
    }
  
    // Expiry date validation
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiryDate)) {
      alert("Please enter a valid expiry date.");
      return;
    }
  
    // CVV validation
    if (!/^\d{3}$/.test(cardInfo.cvv)) {
      alert("Please enter a valid CVV.");
      return;
    }
  
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    ctxDispatch({ type: 'SAVE_CARD_INFO', payload: cardInfo });
    localStorage.setItem('paymentMethod', paymentMethodName);
    localStorage.setItem('cardInfo', JSON.stringify(cardInfo));
    navigate('/placeorder');
  };
  

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="CreditCard"
              label="Credit Card"
              value="CreditCard"
              checked={paymentMethodName === 'CreditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {paymentMethodName === 'CreditCard' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInfoChange}
                    placeholder="Card Number"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiryDate"
                    value={cardInfo.expiryDate}
                    onChange={handleCardInfoChange}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleCardInfoChange}
                    placeholder="CVV"
                    required
                  />
                </Form.Group>
              </>
            )}
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayAtDoor"
              label="Pay at the Door"
              value="PayAtDoor"
              checked={paymentMethodName === 'PayAtDoor'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
