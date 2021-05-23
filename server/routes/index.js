const express = require('express');
const verseController = require('../controllers/verse')
const fontController = require('../controllers/font')


const router = express.Router();

router.get('/verse', verseController.getVerse)
router.get('/fonts', fontController.getFonts)

module.exports = router;