import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar always visible */}
        <Navbar />

        <div className="main-layout">
          {/* Sidebar */}
          <Sidebar />

          <div className="content">
            <Routes>
              {/* Default route → Home */}
              <Route path="/" element={<Home />} />

              {/* Other pages */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
