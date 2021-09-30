const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Room = mongoose.model("Room");
const requireLogin = require("../middleware/requireLogin");

router.post("/createroom", requireLogin, (req, res) => {
  const { user1, user2 } = req.body;

  if (user1 && user2) {
    const room = new Room({
      members: [user1, user2],
    });
    room.populate("members", "_id name profile_pic");
    room
      .save()
      .then((result) => res.json({ result }))
      .catch((err) => console.log(err));
  }
});

router.get("/myrooms", requireLogin, (req, res) => {
  Room.find({ members: { $in: req.user._id } })
    .populate("members", "_id name profile_pic")
    .then((rooms) => res.json({ rooms }))
    .catch((err) => console.log(err));
});

router.get("/room/:friendId", requireLogin, (req, res) => {
  Room.findOne({ members: { $in: req.user._id && req.params.friendId } })
    .populate("members", "_id name profile_pic")
    .populate("messages.posted_By", "_id name profile_pic")
    .then((room) => res.json({ room }))
    .catch((err) => console.log(err));
});

router.post("/addmessage/:roomid", requireLogin, (req, res) => {
  const { message } = req.body;
  const messages = {
    posted_By: req.user._id,
    message,
  };

  console.log(messages)
  Room.findByIdAndUpdate(
    req.params.roomid,
    {
      $push: { messages },
    },
    {
      new: true,
    }
  )
    .then((room) => {
      res.json({ room });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
