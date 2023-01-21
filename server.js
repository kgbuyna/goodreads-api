const dotenv = require("dotenv");
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app = express();
const booksRoutes = require('./routes/book')
const wtrRoutes = require('./routes/wtr')
const signup = require('./routes/signup')
const login = require('./routes/login')


const errorHandler = require('./middleware/error')

dotenv.config({path: './config/config.env'})
connectDB();



app.use(cors());
app.use(express.json());

app.use('/api/v1/', login);
app.use('/api/v1/signup', signup);
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/shelves/wantToReads', wtrRoutes);

app.use(errorHandler);
app.listen(process.env.API_PORT, () => {
  console.log(`Example app listening on port  ${process.env.API_PORT}`)
})