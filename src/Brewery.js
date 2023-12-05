// Brewery.js
// Import dependencies
import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define Brewery component
function Brewery({ brewery, reviews }) {
  // Return the JSX elements
  return (
    <div className="container mt-4">
      <h1 className="text-center">{brewery.name}</h1>
      <Card>
        <Card.Body>
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
            to={`/review/${brewery.id}`}
            className="mt-2"
          >
            Add Review
          </Button>
        </Card.Body>
      </Card>
      <h2 className="text-center mt-4">Reviews</h2>
      <div className="row">
        {reviews.map((review) => (
          <div className="col-md-4" key={review._id}>
            <Card>
              <Card.Body>
                <Card.Title>{review.user_id.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {review.rating} / 5
                </Card.Subtitle>
                <Card.Text>{review.description}</Card.Text>
                <Card.Text className="text-muted">
                  {new Date(review.date).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export Brewery component
export default Brewery;
