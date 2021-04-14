const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// import User from './../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  // console.log('hitting this');
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({
        _id: decoded.id,
        password: decoded.password,
      }).select("-password");
      if (!req.user) {
        throw new Error();
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect };
