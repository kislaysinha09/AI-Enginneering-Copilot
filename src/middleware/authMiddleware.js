require('dotenv').config();
const supabase = require('../supabaseClient'); // Supabase client initialization

/**
 * Supabase authentication middleware.
 * Validates the Bearer token using supabase.auth.getUser().
 * Attaches the user object to req.user on success.
 */
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.debug('Auth middleware triggered:', req.method, req.path);
  console.debug('Authorization header present:', !!authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('Missing or malformed Authorization header');
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      console.warn('Invalid Supabase token:', error?.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.debug('Token validated for user id:', user.id);
    req.user = user; // attach user to request
    req.tenantId = user.id; // raw Supabase UUID for tenant isolation
    next();
  } catch (err) {
    console.error('Authentication middleware error:', err);
    res.status(500).json({ error: 'Internal authentication error' });
  }
};

module.exports = { requireAuth };
