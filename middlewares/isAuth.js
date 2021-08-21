const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ msg: "unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SecretOrKey);
    const user = await User.findById(decoded.userID).select(["-password"]);
    //find the user
    if (!user) {
      return res.status(401).send({ msg: "unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "unauthorized" });
  }
};
