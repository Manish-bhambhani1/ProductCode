import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./product-list.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alldata');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
  <h2>Product List</h2>
  <div>
    
      {products.map((product) => (
        <div key={product._id}>
          <li>
            <p>Product Name: {product.productname}</p>
            <p>Manufacturer Name: {product.manufacturername}</p>
            <p>Description: {product.description}</p>
            {/* Display other product details */}
            <p><img src={product.qrCode} alt="QR Code" /></p>
            <br />
          </li>
        </div>
      ))}
    
  </div>
</div>

  );
};

export default ProductList;
