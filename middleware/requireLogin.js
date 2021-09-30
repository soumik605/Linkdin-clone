const mongoose = require("mongoose");
const { JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");
const User = mongoose.model('User')


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "You must be logged in" });
      } else {
        const { _id } = payload;

        User.findOne({_id})
        .then((userdata) => {
          req.user = userdata;
          next();
        });
        
      }
    });
  }
};
