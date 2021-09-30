const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

router.post("/signup", (req, res) => {
  const { name, email, password, address } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "Please add all fields" });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res
            .status(422)
            .json({ error: "User already exits in this email" });
        } else {
          bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new User({
              name,
              email,
              address,
              password: hashedpassword,
            });
            user
              .save()
              .then((user) => {
                console.log(user);
                res.json({ message: "User Saved Successfully" });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add all fields" });
  } else {
    User.findOne({ email: email })
      .populate("connections", "_id name about profile_pic")
      .populate("conrequests", "_id name about profile_pic")
      .populate("myrequests", "_id name about profile_pic")
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({ error: "Invalid Input" });
        } else {
          bcrypt
            .compare(password, savedUser.password)

            .then((doMatch) => {
              if (doMatch) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);

                res.json({
                  token,
                  user: savedUser,
                });
              } else {
                return res.status(422).json({ error: "Invalid Input" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
});

module.exports = router;
