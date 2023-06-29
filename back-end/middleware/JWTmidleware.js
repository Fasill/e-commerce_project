import jwt from 'jsonwebtoken'

// Generate token expiration time
const maxAge = 300

// Middleware to verify token
export const requireAuth = (req, res, next) => {
  const token = req.headers.token;
  console.log("goot",token)
  if (!token) {
    return res.json({ message: 'No token provided' });
  }
  
  jwt.verify(token, 'fasil', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.userId = decodedToken.id;
    next();
  });
}

