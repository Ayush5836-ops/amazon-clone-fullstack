import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 🔹 Navbar always visible */}
        <Navbar />

        <div className="main-layout">
          {/* 🔹 Sidebar */}
          <Sidebar />

          {/* 🔹 Main Content Area */}
          <div className="content">
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<Home />} />

              {/* Auth Pages */}
              <Route path="/Signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Admin/User Pages */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Product Page */}
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
