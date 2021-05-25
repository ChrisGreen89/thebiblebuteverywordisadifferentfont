const express = require('express');
const twitterController = require('../controllers/twitter')


const router = express.Router();

router.get('/', twitterController.tweetVerse)

module.exports = router;