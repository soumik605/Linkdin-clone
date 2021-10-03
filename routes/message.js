const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Room = mongoose.model("Room");
const requireLogin = require("../middleware/requireLogin");

router.post("/createroom", requireLogin, (req, res) => {
  if (req.body.fid) {
    const room = new Room({
      members: [req.user._id, req.body.fid],
    });
    room.populate("members", "_id name profile_pic");
    room
      .save()
      .then((result) => res.json({ result }))
      .catch((err) => console.log(err));
  }
});

router.put("/deleteroom", requireLogin, (req, res) => {
  Room.findOne({
    members: { $in: [req.body.fid.toString(), req.user._id.toString()] },
  })
    .populate("members", "_id name profile_pic")
    .populate("messages.posted_By", "_id name profile_pic")
    .then((room) => {
      room
        .remove()
        .then((delRoom) => console.log(delRoom))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/myrooms", requireLogin, (req, res) => {
  Room.find({ members: { $in: req.user._id } })
    .populate("members", "_id name profile_pic")
    .then((rooms) => res.json({ rooms }))
    .catch((err) => console.log(err));
});

router.get("/room/:friendId", requireLogin, (req, res) => {
  Room.find({ members: {$in : [req.user._id]} })
    .populate("members", "_id name profile_pic")
    .populate("messages.posted_By", "_id name profile_pic")
    .then((rooms) => {
    rooms.map((room) => {
       room.members.map(member => {
         //console.log(member)
         if(member._id.toString() === req.params.friendId.toString()){
           //console.log(room)
           res.json({room})
         }
       })
      });
    }) 
    .catch((err) => console.log(err));


});

router.post("/addmessage/:roomid", requireLogin, (req, res) => {
  const { message } = req.body;
  const messages = {
    posted_By: req.user._id,
    message,
  };
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
