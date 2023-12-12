// utils/barcodeGenerator.js
const bwipjs = require('bwip-js');

async function generateBarcode(data) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'code128', // You can choose a different barcode type if needed
        text: data,
        scale: 3, // Adjust the scale based on your requirements
        height: 10, // Adjust the height based on your requirements
      },
      (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png);
        }
      }
    );
  });
}

module.exports = generateBarcode;
