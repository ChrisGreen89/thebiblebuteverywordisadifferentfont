const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes')
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`The Bible, but every word is a different font twitter bot up and tweeting!`)
})