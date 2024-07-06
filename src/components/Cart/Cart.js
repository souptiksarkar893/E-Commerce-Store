import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../store/actions/cartActions';
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    setMessage('Item removed from cart');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  if (cartItems.length === 0) return <Container>Your cart is empty</Container>;

  return (
    <Container>
      <h2>Your Cart</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <ListGroup className="mb-3">
        {cartItems.map(item => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.name}</h5>
                <p>${item.price}</p>
              </div>
              <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="success" as={Link} to="/checkout">Proceed to Checkout</Button>
    </Container>
  );
}

export default Cart;
