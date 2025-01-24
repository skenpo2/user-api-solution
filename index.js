const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const app = express();
const PORT = 5000;
const dbURL =
  'mongodb+srv://michealobarewon2015:effdE9qPm08Hbe0h@bmicheal.hkpl7.mongodb.net/userapi?retryWrites=true&w=majority&appName=Bmicheal';

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Connected to Database Successfully');
  })
  .catch(() => {
    console.log('Sorry, Cannot Establish Database Connection');
  });

app.use(express.json());
app.use(userRoute);

app.listen(PORT, () => {
  console.log(`App is Connected  at Port ${PORT}`);
});
