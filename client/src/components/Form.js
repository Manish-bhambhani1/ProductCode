// import React, { useState ,useEffect} from 'react';    
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./form.css";
// const  Form = ({onFormSubmit}) => {
//     const navigate = useNavigate();
//     const [formData,setFormData] = useState({
//         productName:"",
//         manufacturerName:"",
//         description:"",
//         quantity:0,
//         price:0,
//     })
//     const [submissionComplete , setSubmissionComplete] = useState(false);
//     const [barcodeImage, setBarcodeImage] = useState('');

//     useEffect(()=>{
//         if(submissionComplete){
//         setTimeout(() => {
//             console.log('Console log after 2 seconds');
//             setSubmissionComplete(false); // Reset the state after the delay if needed
//           }, 20000);
//         }
// }
//     ,[submissionComplete]);

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         console.log("worked");
//         console.log(formData)
//         try {
//             const response = await axios.post("http://localhost:5000/api/form/formData",formData);
//             console.log("response ",response.data);
//             if( response.status === 201){
//                 console.log("Form submitted successfully ");
//                 setFormData({productName:'',manufacturerName:'',description:'',quantity:0,price:0});
//                 setSubmissionComplete(true);
//                 onFormSubmit(response.data.productId);
               
//                // navigate(`/product-details/${response.data.productId}`);
//                 setBarcodeImage(`data:image/png;base64,${response.data.barcode}`);

//             }
//             else {
//                 console.log("error submitting the form ", response.statusText);
//             }
//         }
//         catch (error) {

//         }

//     }
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value,
//         }));
//       };
    

//     return (
//         <div>
//         <form onSubmit={handleSubmit}>
//         <h2 className="heading">Add Products</h2>
//         <label>
//           Product Name:
//           <input
//             type="text"
//             name="productName"
//             value={formData.productName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//          Manufacturer Name:
//           <input
//             type="text"
//             name="manufacturerName"
//             value={formData.manufacturerName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Product Description:
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Quantity:
//           <input
//             type="number"
//             name="Quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Price:
//           <input
//             type="number"
//             name="Price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>

// {submissionComplete && barcodeImage && (
//     <div>
//       <p>Barcode:</p>
//       <img src={barcodeImage} alt="Barcode" />
//     </div>
//   )}

//   </div>
//     );
// }
// export default Form;
// Form.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Form = ({ onFormSubmit }) => {
    const images = [
        'https://sellbery.com/wp-content/uploads/2022/11/How-to-Create-an-Amazon-Listing-A-Complete-Guide-Picture-1.png', 
        'https://sellerlegend.com/wp-content/uploads/2020/06/how-to-create-amazon-product-listing-01.png', 
        'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/127571358/original/47472fcb7ca790d7b2613fabf11ca0e34c359c04/do-amazon-product-listing.png', // Replace with a valid image URL
      ];
      
      const randomImage = images[Math.floor(Math.random() * images.length)];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    manufacturerName: '',
    description: '',
    quantity: 0,
    price: 0,
  });
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [barcodeImage, setBarcodeImage] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (submissionComplete) {
      setTimeout(() => {
        console.log('Console log after 2 seconds');
        setSubmissionComplete(false);
      }, 20000);
    }
  }, [submissionComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/form/formData',
        formData
      );

      if (response.status === 201) {
        console.log('Form submitted successfully');
        setFormData({
          productName: '',
          manufacturerName: '',
          description: '',
          quantity: 0,
          price: 0,
        });
        setSubmissionComplete(true);
        onFormSubmit(response.data.productId);
        setBarcodeImage(`data:image/png;base64,${response.data.barcode}`);
      } else {
        console.log('Error submitting the form ', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisible((prevVisible) => !prevVisible);
  };

  return (<div className="conta">
    <img src={randomImage} alt="Product Image" className="productImage" />
    <div className="container">
      <div className="dropdown-header" onClick={toggleFormVisibility}>
        <h2 className="heading">Add Products</h2>
        <div className={`arrow-icon ${formVisible ? 'up' : 'down'}`}>
          ▼
        </div>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="dropdown-form">
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Manufacturer Name:
            <input
              type="text"
              name="manufacturerName"
              value={formData.manufacturerName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Product Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              name="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}

      {submissionComplete && barcodeImage && (
        <div>
          <p>Barcode:</p>
          <img src={barcodeImage} alt="Barcode" />
        </div>
      )}
    </div>
    </div>
  );
};

export default Form;
