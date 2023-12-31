const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_KEY);
    console.log(user);
    User.findByPk(user.userId)
      .then((userRow) => {
        req.user = userRow;
        console.log("IN middleware");
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ success: false });
  }
};
