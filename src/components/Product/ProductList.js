import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/actions/productActions';
import ProductItem from './ProductItem';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import './ProductList.css';  // Import the CSS file for custom styles

function ProductList({ searchQuery }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => setView('list')} className="mr-2">
          List View
        </Button>
        <Button variant="primary" onClick={() => setView('grid')}>
          Grid View
        </Button>
      </div>
      <Row xs={1} md={view === 'grid' ? 3 : 1} className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id}>
            <ProductItem product={product} view={view} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
