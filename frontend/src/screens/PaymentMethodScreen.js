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
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethodName === "CreditCard") {
      if (cardNumber.length !== 16) {
        alert("Card number should be exactly 16 digits.");
        return;
      }
      if (!/^(\d{2})\/(\d{2})$/.test(expiryDate)) {
        alert("Expiry date should be in MM/YY format.");
        return;
      }
      if (cvv.length !== 3) {
        alert("CVV should be exactly 3 digits.");
        return;
      }
    }
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
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
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control type="text" placeholder="MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control type="text" value={cvv} onChange={e => setCvv(e.target.value)} />
                    </Form.Group>
                  </div>
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