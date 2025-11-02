import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // You’ll connect this to your backend API later
    // For now, dummy data:
    const sampleProducts = [
      { id: 1, name: 'iPhone 15 Pro', price: 129999, category: 'Mobiles' },
      { id: 2, name: 'Samsung S24 Ultra', price: 119999, category: 'Mobiles' },
      { id: 3, name: 'Sony Headphones', price: 9999, category: 'Accessories' },
    ];
    setProducts(sampleProducts);

    // Example when backend ready:
    // axios.get('http://localhost:8080/api/products')
    //   .then(res => setProducts(res.data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-list">
      <h2>Product List 🛒</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
