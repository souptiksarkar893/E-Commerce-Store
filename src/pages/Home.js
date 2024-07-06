import React, { useState } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import ProductList from '../components/Product/ProductList';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form className="d-flex mb-4 mt-4" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search for products"
        className="mr-2"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <ProductList searchQuery={searchQuery} />
    </Container>
  );
}

export default Home;
