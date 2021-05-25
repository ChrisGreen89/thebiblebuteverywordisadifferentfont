const express = require('express');
const verseController = require('../controllers/verse')
const utilController = require('../controllers/util')


const router = express.Router();

router.get('/verse/generate', verseController.generateUrlForScreenshot)
router.get('/verse', verseController.getVerse)
router.get('/capture', utilController.getCapture)

module.exports = router;