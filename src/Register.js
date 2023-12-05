// Register.js
// Import dependencies
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// Import the useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Define Register component
function Register({ handleRegister }) {
  // Define state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Call the useNavigate hook and assign it to a variable
  const navigate = useNavigate();

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default behavior
    e.preventDefault();
    // Call the handleRegister function with the input values
    handleRegister(username, password);
    // Redirect to the home page using the navigate function
    navigate("/");
  };

  // Define a function to handle input change
  const handleChange = (e) => {
    // Get the name and value of the input
    const { name, value } = e.target;
    // Set the state according to the name
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // Return the JSX elements
  return (
    <div className="container mt-4">
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

// Export Register component
export default Register;
