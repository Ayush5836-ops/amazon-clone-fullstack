import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Automatically navigate to login after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 60000); // 60 seconds = 1 minute

    // cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  // 🛍️ Button click handler
  const handleStartShopping = () => {
    navigate("/products"); // instantly go to products page
  };

  return (
    <div className="home-page text-center mt-5">
      <h1 className="fw-bold">
        Welcome to Amazon Clone 🛍️
      </h1>
      <p className="text-muted">
        Shop your favorite products at amazing prices!
      </p>

      <button
        className="btn btn-warning mt-3 px-4 py-2"
        onClick={handleStartShopping}
      >
        Start Shopping
      </button>
    </div>
  );
};

export default Home;
