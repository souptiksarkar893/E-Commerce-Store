import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { Card, Button, ListGroup, Alert } from 'react-bootstrap';
import './ProductItem.css';  // Import the CSS file for custom styles

function ProductItem({ product, view }) {
  const dispatch = useDispatch();
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000); // Hide the message after 3 seconds
  };

  if (view === 'list') {
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 product-list-item">
        <div className="d-flex">
          <img src={product.image} alt={product.name} className="product-list-image mr-3" />
          <div>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="mb-2">${product.price}</p>
          <div className="btn-group">
            <Button variant="primary" as={Link} to={`/product/${product.id}`} className="mr-2">View</Button>
            <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
          {addedMessage && <Alert variant="success" className="mt-2">Item added to cart</Alert>}
        </div>
      </ListGroup.Item>
    );
  }

  return (
    <Card className="mb-3 ProductItem">
      <Card.Img variant="top" src={product.image} className="product-card-image" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <div className="btn-group">
          <Button variant="primary" as={Link} to={`/product/${product.id}`}>View</Button>
          <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
        {addedMessage && <Alert variant="success" className="mt-2">Item added to cart</Alert>}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
