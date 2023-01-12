const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app = express();
const port = 4000;
const booksRoutes = require('./routes/book')
const wtrRoutes = require('./routes/wtr')
const errorHandler = require('./middleware/error')

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/shelves/wantToReads', wtrRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})