// formRoutes.js
const express = require('express');
const Form = require('../models/form'); // Adjust the path based on your project structure
const generateBarcode = require('../utils/barcodeGenerator');
const QRCode = require('../models/Qrcode');
const router = express.Router();
const qrCODE = require('qrcode');

const admin = require("../config/firebase.config");
const user = require("../models/user");
const Qrcode = require('../models/Qrcode');

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    // checking user email already exists or not
    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    //console.log("userExists" , userExists)
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role:"admin",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const options = {
      upsert: true,
      new: true,
    };
  
    try {
      const result = await user.findOneAndUpdate(
        filter,
        { auth_time: decodeValue.auth_time },
        options
      );
      res.status(200).send({ user: result });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  };



// Get all form data
router.get('/formData', async (req, res) => {
  try {
    const formData = await Form.find();
    res.json(formData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new form entry
router.post('/formData', async (req, res) => {
    console.log("req.nody",req.body);
  try {
    const productname= req.body.productName;
    const  manufacturername = req.body.manufacturerName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const newFormEntry = new Form({ productname,  manufacturername,  description , price , quantity });
    console.log("new form entry",newFormEntry);
    await newFormEntry.save();
    const barcodeData = `${productname}-${manufacturername}-${price}-${quantity}`;
    const barcodeImageBuffer = await generateBarcode(barcodeData);

    const productId = newFormEntry._id;
    // Respond with the newly created form entry and barcode image buffer
    res.status(201).json({
      productId,
      formEntry: newFormEntry,
      barcode: barcodeImageBuffer.toString('base64'), // Send the base64-encoded image
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to get all QR codes

router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Form.findOne({ _id: productId });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Generate QR code for the product details route
    const qrCode = await qrCODE.toDataURL(JSON.stringify(product));
   // console.log(qrCode);
    // Save QR code to the database
    const newQRCode = new Qrcode({
      productId,
      qrcode: qrCode,
    });
    console.log("details",product);
    console.log("id",productId);
    
    await newQRCode.save();
    const result = {
      productId,
      qrcode:qrCode,
      product,
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all products with QR codes
router.get('/alldata', async (req, res) => {
  try {
    // Fetch all forms (products) and exclude MongoDB-specific fields
    const products = await Form.find().lean();
console.log(products);
    // For each product, get its QR code
    const productsWithQRCodes = await Promise.all(products.map(async (product) => {
      const productid = product._id.toString();
      const qrCode = await QRCode.findOne({productId:productid});
      console.log(qrCode);
      return { ...product, _id: product._id.toString(), qrCode: qrCode ? qrCode.qrcode : null };
    }));

    res.status(200).json(productsWithQRCodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
