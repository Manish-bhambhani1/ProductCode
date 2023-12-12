const QRCode = require('qrcode');
const generateQRCode = async (productId) => {
    const url = `http://localhost:5000/product/${productId}`;
    try {
      const qrCode = await QRCode.toDataURL(url);
      return qrCode;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  