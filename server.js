const express = require('express');
const book = require('./Models/Book');
const connectDB = require('./config/db.js');
const cors = require('cors');

const app = express();
const port = 4000;

// app.use(cors());

connectDB();

app.get('/', async (req, res) => {
  console.log("Get request")
  let query = book.find();
  
  const books = await query; 
  res.status(200).json({
    success : true, 
    data : books
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})