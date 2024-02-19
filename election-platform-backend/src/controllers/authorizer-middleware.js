const supabaseClient = require('../lib/supabase');
const jwt = require('jsonwebtoken');

async function protectRoute(req, res, next) {
  const bearerToken = req.headers.authorization.split(' ')[1];
  // verify a token symmetric - synchronous
  console.log(bearerToken);
  try {
    const decoded = jwt.verify(bearerToken, process.env.SUPABASE_JWT_SECRET);
    console.log(decoded); // bar
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = protectRoute;
