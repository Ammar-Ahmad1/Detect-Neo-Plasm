const express = require('express');
const router = express.Router();
const { sendForClassification } = require('../controllers/detectionController');

// const multer = require('multer');

// configure multer to store the uploaded file in memory
// const storage = multer.memoryStorage();

const upload= require('../middlewares/multer')

// route for handling image classification
router.post('/classifyimage', upload.single('image'), sendForClassification);

module.exports = router;
