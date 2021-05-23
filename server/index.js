const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

require('dotenv').config();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})