const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const EmployeeRoute = require('./routes/EmployeeRoute');
const LeaveRoute = require('./routes/LeaveRoute');
const LeaveRequestReplyRoute = require('./routes/LeaveRequestReplyRoute');
const LeaveRequestSharedRoute = require('./routes/LeaveRequestSharedRoute');
const CountryRoute = require('./routes/CountryRoute');
const GenderRoute = require('./routes/GenderRoute');
const env = require('./env');

const app = express();

// Connect to MongoDB
mongoose
  .connect(env.mongodb_url, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('🚌 Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('🔥 😠 An error occured while conencting to MongoDB', err);
  });

app.use(cors());

// Logger middleware
app.use((req, res, next) => {
  console.log(
    `🔥🍕[${new Date().toTimeString()}]: ${req.method} ${req.url}🔥🍕`
  );
  next();
});

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/employee', EmployeeRoute);

app.use('/leave', LeaveRoute);

app.use('/request_reply', LeaveRequestReplyRoute);

app.use('/request_shared', LeaveRequestSharedRoute);
app.use('/country', CountryRoute);
app.use('/gender', GenderRoute);

app.listen(env.port).on('listening', () => {
  console.log('🚀 We are live on ' + env.port);
});
