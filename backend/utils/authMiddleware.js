import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Function to generate JWT token
const generateJWT = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "10d" });
};

export { isAuthenticated, generateJWT };
