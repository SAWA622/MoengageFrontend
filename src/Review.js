// Review.js
// Import dependencies
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Define Review component
function Review({ handleSubmit, handleLoad }) {
  // Define state variables
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");

  // Define params object
  const params = useParams();

  // Define useEffect hook to load the reviews for the selected brewery
  useEffect(() => {
    // Call the handleLoad function with the brewery id
    handleLoad(params.id);
  }, [params.id, handleLoad]);

  // Define a function to handle form submission
  const handleFormSubmit = (e) => {
    // Prevent the default behavior
    e.preventDefault();
    // Call the handleSubmit function with the input values
    handleSubmit(rating, description);
    // Clear the input values
    setRating(1);
    setDescription("");
  };

  // Define a function to handle input change
  const handleChange = (e) => {
    // Get the name and value of the input
    const { name, value } = e.target;
    // Set the state according to the name
    switch (name) {
      case "rating":
        setRating(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  // Return the JSX elements
  return (
    <div className="container mt-4">
      <h1 className="text-center">Add Review</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            name="rating"
            value={rating}
            onChange={handleChange}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter your review"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

// Export Review component
export default Review;
