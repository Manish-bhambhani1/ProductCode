import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BarcodeScanner = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const barcodeString = queryParams.get('barcode');
  const barcodeImageRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [mounted, setMounted]=useState(false);
  const [scannedProductId, setScannedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const initializeQuagga = async () => {
      if (isMounted && barcodeImageRef.current) {
        const initPromise = new Promise((resolve, reject) => {
          Quagga.init(
            {
              inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: barcodeImageRef.current,
                singleChannel: true,
              },
              decoder: {
                readers: ['code_128_reader'],
              },
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
    
        try {
          await initPromise;
          Quagga.start();
    
          Quagga.onDetected((data) => {
            const scannedData = data.codeResult.code;
            console.log(scannedData);
            setScannedProductId(scannedData);
            alert(`Scanned Barcode: ${scannedData}`);
            setIsMounted(false);
          });
        } catch (error) {
          console.error('Error initializing Quagga:', error);
        }
      }
    };
    
    initializeQuagga();

    // Cleanup Quagga when the component unmounts
    return () => {
      if(mounted){
      if (Quagga && Quagga.stop) {
        Quagga.stop();
      }
    }
    };
  }, [isMounted]);

  const handleStartButtonClick = () => {
    // Toggle isMounted state
    setIsMounted((prevIsMounted) => !prevIsMounted);
    setMounted((prevIsMounted) => !prevIsMounted);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (scannedProductId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/product/form/${scannedProductId}`);
          if (response.status === 200) {
            setProductDetails(response.data);
          } else {
            console.error('Error fetching product details');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [scannedProductId]);

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <button onClick={handleStartButtonClick}>
        {isMounted ? 'Stop Camera' : 'Start Camera'}
      </button>
      <div  ref={barcodeImageRef} style={{ width: '100%', height: '100vh' }} />
    
      {productDetails && (
        <div>
          <h2>Product Details</h2>
          <p>Product Name: {productDetails.productname}</p>
          <p>Manufacturer: {productDetails.manufacturername}</p>
          <p>Price: ${productDetails.price}</p>
          {/* Add other product details as needed */}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
