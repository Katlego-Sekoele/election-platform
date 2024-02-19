const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/user');

const supabaseClient = require('./lib/supabase');

const PORT = process.env.PORT || 3001;
const app = express();
const indexRoutes = require('./routes/index-routes');
const User = require('./models/user');

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

app.options('*', cors());  // Respond to preflight requests
app.use(cors());
app.disable('etag');
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.get('/auth/confirm', async function (req, res) {
  const token_hash = req.query.token_hash;
  const type = req.query.type;
  console.log('token_hash', token_hash);
  console.log('type', type);
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
app.use(async (request, response, next) => {
  request.supabase = supabaseClient.createClient({ req: request, res: response });

  const token = request.headers.authorization;

  if (!token) {
    request.user = null;
    next();
    return;
  }

  const user = await request.supabase.auth.getUser(request.headers.authorization.split(' ')[1]);

  if (user.error) {
    request.user = null;
    next();
    return;
  }

  const mongoUser = await UserModel.findOneByAuthId(user.data.user.id);
  if (mongoUser) {
    request.user = { ...user.data.user, ...mongoUser._doc };
  } else {
    const newUser = new User({
      authId: user.data.user.id,
      username: user.data.user.email,
      email: user.data.user.email,
      roles: ['user'],
    });
    await newUser.save();
    request.user = { ...user.data.user, ...newUser._doc };
  }

  next();
  return;
});
app.get('/api/me', (req, res) => {
  res.json(req.user);
});
app.use('/api', indexRoutes);

connect();

module.exports = app;
