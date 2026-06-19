// src/routes/protectedRoutes.js
// Protected route example that returns the authenticated user's info
const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware'); // Supabase auth middleware

const router = express.Router();

// GET /api/protected/ – returns user data if authenticated
router.get('/', requireAuth, (req, res) => {
  // req.user is set by the middleware after successful token validation
  res.json({
    message: 'Authenticated request successful',
    user: req.user,
  });
});

module.exports = router;
