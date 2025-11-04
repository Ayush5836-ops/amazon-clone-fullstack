import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Products fetched:", data);
        setProducts(data);
      })
      .catch((error) => console.error("❌ Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛍️ Available Products</h2>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <h6 className="text-success">₹{product.price}</h6>
                  <span className="badge bg-secondary">{product.category}</span>
                  <br />
                  <button className="btn btn-primary mt-2">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-muted">Loading products...</h5>
        )}
      </div>
    </div>
  );
};

export default ProductList;
