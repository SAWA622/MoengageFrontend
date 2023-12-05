// App.js
// Import dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import components and pages
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Brewery from "./Brewery";
import Review from "./Review";
// Import the style.css file
import "./style.css";
// Define App component
function App() {
  // Define state variables
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Define API url
  const API_URL = "http://localhost:5000/api";

  // Define useEffect hook to load the token from the local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Define useEffect hook to load the user data from the token
  useEffect(() => {
    if (token) {
      // Decode the token
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Set the user id
      setUser(payload.id);
    } else {
      // Clear the user id
      setUser(null);
    }
  }, [token]);

  // Define a function to handle user registration
  const handleRegister = async (username, password) => {
    try {
      // Make a POST request to the register endpoint
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
      });
      // Get the token from the response
      const newToken = response.data.token;
      // Set the token in the state
      setToken(newToken);
      // Save the token in the local storage
      localStorage.setItem("token", newToken);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Define a function to handle user login
  const handleLogin = async (username, password) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      // Get the token from the response
      const newToken = response.data.token;
      // Set the token in the state
      setToken(newToken);
      // Save the token in the local storage
      localStorage.setItem("token", newToken);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Define a function to handle user logout
  const handleLogout = () => {
    // Clear the token from the state
    setToken(null);
    // Clear the token from the local storage
    localStorage.removeItem("token");
  };

  // Define a function to handle brewery search
  const handleSearch = async (by_city, by_name, by_type) => {
    try {
      // Construct the query string
      let query = "";
      if (by_city) {
        query += `by_city=${by_city}&`;
      }
      if (by_name) {
        query += `by_name=${by_name}&`;
      }
      if (by_type) {
        query += `by_type=${by_type}&`;
      }

      // Make a GET request to the search endpoint
      const response = await axios.get(`${API_URL}/brewery/search?${query}`);

      // Get the data from the response
      const data = response.data;

      // Set the breweries in the state
      setBreweries(data);

    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Define a function to handle brewery selection
  const handleSelect = async (id) => {
    try {
      // Make a GET request to the brewery endpoint
      const response = await axios.get(`${API_URL}/brewery/${id}`);

      // Get the data from the response
      const data = response.data;

      // Set the brewery in the state
      setBrewery(data);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Define a function to handle review submission
  const handleSubmit = async (rating, description) => {
    try {
      // Validate the input
      if (!rating || !description) {
        return alert("Please provide a rating and a description");
      }

      // Make a POST request to the review endpoint
      const response = await axios.post(
        `${API_URL}/brewery/${brewery.id}/review`,
        {
          rating,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Get the message from the response
      const message = response.data.message;

      // Alert the message
      alert(message);

      // Reload the reviews
      handleLoad(brewery.id);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Define a function to handle review loading
  const handleLoad = async (id) => {
    try {
      // Make a GET request to the reviews endpoint
      const response = await axios.get(`${API_URL}/brewery/${id}/reviews`);

      // Get the data from the response
      const data = response.data;

      // Set the reviews in the state
      setReviews(data);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  // Return the JSX elements
  return (
    <BrowserRouter>
      <Navbar user={user} handleLogout={handleLogout} />
      
      <Routes>
       
        <Route path="/" element={<Home breweries={breweries} handleSearch={handleSearch} handleSelect={handleSelect} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register handleRegister={handleRegister} />} />
        <Route path="/brewery/:id" element={brewery ? <Brewery brewery={brewery} reviews={reviews} /> : <div>Loading...</div>} />
        <Route path="/review/:id" element={<Review handleSubmit={handleSubmit} handleLoad={handleLoad} />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export App component
export default App;
