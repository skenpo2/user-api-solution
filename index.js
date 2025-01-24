const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const app = express();

// define port
const PORT = 5000;

// Atlas Server URL
const dbURL =
  'mongodb+srv://michealobarewon2015:effdE9qPm08Hbe0h@bmicheal.hkpl7.mongodb.net/userapi?retryWrites=true&w=majority&appName=Bmicheal';

// connecting to MongoDb Atlas Database Server
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Connected to Database Successfully');
  })
  .catch(() => {
    console.log('Sorry, Cannot Establish Database Connection');
  });
// using json middleware
app.use(express.json());

// user endpoints routes
app.use(userRoute);

app.listen(PORT, () => {
  console.log(`App is Connected  at Port ${PORT}`);
});
