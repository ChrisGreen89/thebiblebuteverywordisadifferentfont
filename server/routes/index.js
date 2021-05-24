const express = require('express');
const verseController = require('../controllers/verse')
const fontController = require('../controllers/font')
const utilController = require('../controllers/util')


const router = express.Router();

router.get('/verse', verseController.getVerse)
router.get('/fonts', fontController.getFonts)
router.get('/capture', utilController.getCapture)

module.exports = router;