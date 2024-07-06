import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(state => state.cart.items);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentStatus('error');
      console.error(error);
    } else {
      setPaymentStatus('success');
      setPaymentMethod(paymentMethod);
      console.log(paymentMethod);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <CardElement className="mb-3" />
        <Button variant="primary" type="submit" disabled={!stripe}>Place Order</Button>
      </Form>
      {paymentStatus === 'success' && (
        <Alert variant="success" className="mt-3">
          <h4>Order placed successfully!</h4>
          <p>Payment ID: {paymentMethod.id}</p>
          <p>Card: **** **** **** {paymentMethod.card.last4}</p>
          <p>Amount: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
        </Alert>
      )}
      {paymentStatus === 'error' && (
        <Alert variant="danger" className="mt-3">
          There was an issue with your payment. Please try again.
        </Alert>
      )}
    </Container>
  );
}

function Checkout() {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <Container>
      <h2>Checkout</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
}

export default Checkout;
