import React, { useState, useEffect ,useRef} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./productDetail.css"
import Quagga from 'quagga';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Now 'id' contains the value from the URL parameter
  console.log('ProductDetails id:', id);

  const [productData, setProductData] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [barcodeImage, setBarcodeImage] = useState('');
  const barcodeImageRef = useRef(null);
  const [forceupdate , setForceUpdate] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        console.log(response.data);
        if (response.status === 200) {
          setProductData(response.data);
          setQrCodeImage(response.data.qrcode);
          setBarcodeImage(`data:image/png;base64,${response.data.barcode}`);
          //setForceUpdate((prev)=>!prev);
          //console.log(response.data.barcode);
        } else {
          console.log('Error fetching product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductData();
  }, [id]); // Include 'id' in the dependency array to re-run the effect when 'id' changes

  const handleViewDetails = () => {
   // Assuming there's a property 'barcode' in the productData
    const barcodeString = barcodeImage;
  
    if (barcodeString) {
      // Navigate to the barcode details page and pass the barcode string as a query parameter
      navigate(`/barcode-scanner?barcode=${barcodeString}`);
    } else {
      console.error('Barcode string is not available.');
      // Optionally, you can provide feedback to the user about the missing barcode.
    }
    // setForceUpdate((prev)=>!(prev));
  };
  
  
  useEffect(() => {
    console.log("run use effect");
    const initializeQuagga = async () => {
      if (forceupdate && barcodeImageRef.current) {
        console.log("Quagga",barcodeImage);
        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: barcodeImageRef.current,
             
              singleChannel: true,
            },
            decoder: {
              readers: ['code_128_reader'], // Adjust based on the type of barcode you're using
            },
          },
          (err) => {
            if (err) {
              console.error('Error initializing Quagga:', err);
              return;
            }
            Quagga.start();
          }
        );

        Quagga.onDetected((data) => {
          const scannedData = data.codeResult.code;
          alert(`Scanned Barcode: ${scannedData}`);
          // Handle the scanned data as needed, e.g., send it to the server
        });
      }
    };
//console.log(barcodeImage);
    initializeQuagga();

    // Cleanup Quagga when the component unmounts
    return () => {
      console.log("stopped ",Quagga);
      if (Quagga && Quagga.stop) {
        Quagga.stop();
      }
    };
  },[forceupdate]);



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
          <br>
          </br>
          <img ref={barcodeImageRef} src={barcodeImage} alt="Barcode" />

          <div className="orderActions">
        <button className="orderButton">Order</button>
        <button className="viewDetailsButton" onClick={handleViewDetails} />
        <button className="addToCartButton">Add to Cart</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
