import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Form from './Form';
import ProductDetails from './ProductDetails';

const Home = () => {
  const navigate = useNavigate();
 // const [productId, setProductId] = useState(null);
 const images = [
    'https://sellbery.com/wp-content/uploads/2022/11/How-to-Create-an-Amazon-Listing-A-Complete-Guide-Picture-1.png', 
    'https://sellerlegend.com/wp-content/uploads/2020/06/how-to-create-amazon-product-listing-01.png', 
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/127571358/original/47472fcb7ca790d7b2613fabf11ca0e34c359c04/do-amazon-product-listing.png', // Replace with a valid image URL
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const handleFormSubmit = (newProductId) => {
   // setProductId(newProductId);
    const productid = newProductId;
    console.log("home",productid);
    // Navigate to the product details page after form submission
    navigate(`/product-details/${productid}`);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
       
      <Header />
      <Routes>
        {/* Render the Form component directly in the route */}
       
        <Route path="/" element={<Form onFormSubmit={handleFormSubmit} />} />

        {/* Render the ProductDetails component with the productId from the URL parameter */}
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default Home;
