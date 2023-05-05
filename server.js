const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const fileUpload = require('express-fileupload');
dotenv.config();
const Detectroutes = require('./routes/detectionRoute');
const url = process.env.MONGO_URI;
app.use("/uploads", express.static("uploads"));
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ limit: '50mb',extended: true}));
app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(express.json({limit: '50mb', extended: true}));
// app.use(express.json());
app.use(cors());



app.use("/auth", require("./routes/authRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/patient", require("./routes/patientRoute"));
app.use("/detection", require('./routes/detectionRoute'));




if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
