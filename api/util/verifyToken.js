const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Accès refusé" });
  }
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(err);
    return res.status(403).json({ message: "Token invalide" });
  }
}

module.exports = verifyToken;
