import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./productDetail.css"


const ProductDetails = () => {
  const { id } = useParams();

  // Now 'id' contains the value from the URL parameter
  console.log('ProductDetails id:', id);

  const [productData, setProductData] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        console.log(response.data);
        if (response.status === 200) {
          setProductData(response.data);
          setQrCodeImage(response.data.qrcode);
        } else {
          console.log('Error fetching product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductData();
  }, [id]); // Include 'id' in the dependency array to re-run the effect when 'id' changes

  return (
    <div>
      {productData && (
        <div className='container1'>
          <h2>Product Details</h2>
          <p>Product Name: {productData.product.productname}</p>
          <p>Manufacturer Name: {productData.product.manufacturername}</p>
          <p>Description: {productData.product.description}</p>
          <p>Quantity: {productData.product.quantity}</p>
          <p>Price: {productData.product.price}</p>

          <p>QR Code:</p>
          <img src={qrCodeImage} alt="QR Code" />
          <div className="orderActions">
        <button className="orderButton">Order</button>
        <button className="viewDetailsButton">View Details</button>
        <button className="addToCartButton">Add to Cart</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
