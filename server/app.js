const express = require("express");
const app = express();
const QRCode = require('qrcode');
require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.json("Hi there");
});

const generateQRCode = async (productId) => {
  const url = `http://localhost:5000/api/product/${productId}`;
  try {
    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};
const QrRoute = require("./routes/auth");
app.use("/api/", QrRoute);



app.use(express.json());
//user authentatication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

const FormRoute = require("./routes/auth")
app.use("/api/form/",FormRoute);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });


 

app.listen(5000, () => console.log("express server listening to 5000"));
