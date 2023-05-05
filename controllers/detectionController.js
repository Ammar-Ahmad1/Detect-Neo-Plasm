const axios = require('axios');
const multer = require('multer');
const cloudinary= require('../middlewares/cloudinary')
const storage = multer.memoryStorage();
const upload = multer({ storage });
const FormData = require('form-data');
const fs = require('fs');
const classifyImage = async (req, res) => {
  try {
    // get the image file from the request
    const imageFile = req.file.buffer;

    // create a new form data object
    const formData = new FormData();

    // append the image file to the form data object
    formData.append('image', imageFile, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // send a POST request to the Flask server with the form data
    const response = await axios.post('http://localhost:8000/upload_image', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // return the response from the Flask server to the client
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports.sendForClassification = async (req, res) => {
  try {
    if(!req.file) {
      res.status(400).json({ error: 'Please upload an image' });
    }
    else{
    console.log(req.file);

    // const formData = new FormData();
    // formData.append('image', req.file)
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path),{
      filename: req.file.originalname,
    });

    const finalReport = await axios.post('http://localhost:5001/upload_image',formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
    });
    console.log(finalReport.data);

    res.json({  report: finalReport.data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// module.exports = upload.single('image'), classifyImage;
