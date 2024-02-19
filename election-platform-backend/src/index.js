const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const supabaseClient = require('./lib/supabase');

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

app.use(cors());
app.disable('etag');
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.get('/auth/confirm', async function (req, res) {
  const token_hash = req.query.token_hash;
  const type = req.query.type;
  if (token_hash && type) {
    const supabase = supabaseClient.createClient({ req, res });
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // return the user to the next page
      res.status(200).json({ message: 'Authentication confirmed' });
    } else {
      // return the user to an error page with some instructions
      res.status(500).json({ message: 'Error confirming authentication' });
    }
  } else {
    // return the user to an error page with some instructions
    res.status(500).json({ message: 'Incomplete request' });
  }
});
app.use('/api', indexRoutes);

connect();

module.exports = app;
