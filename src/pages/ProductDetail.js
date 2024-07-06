import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import './ProductDetail.css'; // Import the CSS file for custom styles

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const [product, setProduct] = useState(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      setProduct(products.find(p => p.id === parseInt(id)));
    }
  }, [dispatch, id, products]);

  useEffect(() => {
    if (products.length > 0) {
      setProduct(products.find(p => p.id === parseInt(id)));
    }
  }, [id, products]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000); // Hide the message after 3 seconds
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return <Container>Product not found</Container>;

  return (
    <Container className="product-detail-container">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid className="product-image" />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4 className="product-price">${product.price}</h4>
          <Button variant="success" onClick={handleAddToCart} className="mb-2">Add to Cart</Button>
          {addedMessage && <Alert variant="success">Item added to cart</Alert>}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
