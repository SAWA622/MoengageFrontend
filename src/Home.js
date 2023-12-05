// Home.js
import React, { useState } from "react";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ breweries, handleSearch, handleSelect }) {
  const [by_city, setByCity] = useState("");
  const [by_name, setByName] = useState("");
  const [by_type, setByType] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(by_city, by_name, by_type);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "by_city":
        setByCity(value);
        break;
      case "by_name":
        setByName(value);
        break;
      case "by_type":
        setByType(value);
        break;
      default:
        break;
    }
  };

  // Define an array of brewery types
  const breweryTypes = [
    "micro",
    "nano",
    "regional",
    "brewpub",
    "large",
    "planning",
    "bar",
    "contract",
    "proprietor",
    "closed",
  ];

  // Return the JSX elements
  return (
    <div className="container mt-4">
      <h1 className="text-center">Welcome to Brewery Review</h1>
      <p className="text-center">Search for breweries and add your reviews</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search by city</Form.Label>
          <Form.Control
            type="text"
            name="by_city"
            value={by_city}
            onChange={handleChange}
            placeholder="Enter city name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Search by name</Form.Label>
          <Form.Control
            type="text"
            name="by_name"
            value={by_name}
            onChange={handleChange}
            placeholder="Enter brewery name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Search by type</Form.Label>
          
          <Form.Control
            as="select"
            name="by_type"
            value={by_type}
            onChange={handleChange}
          >
           
            <option value="">Select a type</option>
            {breweryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <div className="row mt-4">
        {breweries.map((brewery) => (
          <div className="col-md-4" key={brewery.id}>
            <Card>
              <Card.Body>
                <Card.Title>{brewery.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {brewery.brewery_type}
                </Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Address:</strong> {brewery.street}, {brewery.city},{" "}
                    {brewery.state}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {brewery.phone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Website:</strong>{" "}
                    <a href={brewery.website_url} target="_blank" rel="noreferrer">
                      {brewery.website_url}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="success"
                  as={Link}
                  to={`/brewery/${brewery.id}`}
                  onClick={() => handleSelect(brewery.id)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export Home component
export default Home;
