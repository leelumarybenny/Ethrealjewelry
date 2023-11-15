const jwt = require("jsonwebtoken");

// Your secret key for JWT encryption and decryption
const secretKey = "dshbndsh21e123#gbn";

// Encrypt (Sign) the JWT
const token = async (payload) =>
  jwt.sign(payload, secretKey, { expiresIn: "1h" });

// Decrypt (Verify) the JWT

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("bearerHeader", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // Token verification failed
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded; // Attach the decoded payload to the request object
      next(); // Call the next middleware or route handler
    });
  } else {
    // No Bearer token provided in the Authorization header
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports.token = token;
module.exports.verifyToken = verifyToken;
