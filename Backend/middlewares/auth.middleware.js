import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming token is passed as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // This will throw an error if token is invalid

    // Add the decoded user to the request object
    req.user = decoded; // Attach user data (id, email, role) to the request object

    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
