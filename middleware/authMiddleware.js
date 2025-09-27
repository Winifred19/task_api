const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const AuthMiddleware = (req, res, next) => {
  try {
    // check for presence of bearer token in authorization headers

    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new Error("Please pass in bearer token in authorization headers");
    }

    const [type, token] = bearerToken.split(" ") ?? [];

    if (!token) {
      throw new Error("Please add authorization token");
    }

    const secrete = process.env.SECRETE || "secrete";

    jwt.verify(token, secrete, (err, decoded) => {
      if (err) {
        throw new Errror("Invalid auth token");
      }
      req.user = decoded;

      next();
    });
  } catch (err) {
    console.log("Error from Auth middleware", err);

    res.status(401).send({
      status: false,
      message: "Unauthorized access",
      error: err.message,
    });
  }
};

module.exports = AuthMiddleware;
