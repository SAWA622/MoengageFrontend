// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Brewery from "./Brewery";
import Review from "./Review";

import "./style.css";

function App() {
  // Define state variables
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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

  const handleRegister = async (username, password) => {
    try {
      // Make a POST request to the register endpoint
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
      });
      const newToken = response.data.token;
      // Set the token in the state
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      // Get the token from the response
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Define a function to handle brewery search
  const handleSearch = async (by_city, by_name, by_type) => {
    try {
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

      const response = await axios.get(`${API_URL}/brewery/search?${query}`);

      const data = response.data;
      setBreweries(data);

    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const handleSelect = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/brewery/${id}`);

      const data = response.data;
      setBrewery(data);
    } catch (err) {
      // Handle errors
      console.error(err);
      alert(err.response.data.message);
    }
  };

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

  
      const message = response.data.message;

      alert(message);

      handleLoad(brewery.id);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const handleLoad = async (id) => {
    try {
      // Make a GET request to the reviews endpoint
      const response = await axios.get(`${API_URL}/brewery/${id}/reviews`);

      // Get the data from the response
      const data = response.data;

      setReviews(data);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

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
export default App;
