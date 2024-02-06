const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan')

const PORT = process.env.PORT || 3001;
const app = express();
const indexRoutes = require('./routes/index-routes');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.info('Connected to MongoDB');
    app.listen(PORT, () => {
      console.info(`Running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

app.disable('etag');
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', indexRoutes);

connect();

module.exports = app;
