const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, photo } = req.body;

  if (title == "" && photo == "") {
    return res.status(422).json({ error: "Please Add Something !!" });
  } else {
    req.user.password = undefined;
    const post = new Post({
      title,
      photo,
      posted_By: req.user,
    });
    post
      .save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/allsubpost", requireLogin, (req, res) => {
  Post.find({ posted_By: { $in: req.user.connections } })
    .populate("posted_By", "_id name about profile_pic")
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name profile_pic")
    .sort("-createdAt")
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      return res.json({ err });
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .then((post) => {
      if (post.likes.includes(req.user._id)) {
        return res.status(422).json({ error });
      } else {
        Post.findByIdAndUpdate(
          req.body.postId,
          {
            $push: { likes: req.user._id },
            console,
          },
          {
            new: true,
          }
        )
          .populate("posted_By", "_id name about profile_pic")
          .populate("comments.commented_By", "_id name profile_pic")
          .populate("likes", "_id name profile_pic")
          .exec((err, result) => {
            if (err) {
              res.status(422).json({ error: err });
            } else {
              res.json({ result });
            }
          });
      }
    })
    .catch((err) => console.log(err));
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("posted_By", "_id name about profile_pic")
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name profile_pic")
    .exec((err, result) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.json({ result });
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    commented_By: req.user._id,
  };

  if (req.body.text == "" || null) {
    return res.status(422).json({ error: "Add a comment !!" });
  } else {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.commented_By", "_id name profile_pic")
      .populate("likes", "_id name profile_pic")
      .populate("posted_By", "_id name profile_pic")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json({ result });
        }
      });
  }
});

router.delete("/delete/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("posted_By", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (req.user._id.toString() === post.posted_By._id.toString()) {
        post
          .remove()
          .then((resp) => res.json({ resp }))
          .catch((err) => console.log(err));
      }
    });
});

router.put("/deletecomment/:postId/:commentId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name profile_pic")
    .populate("posted_By", "_id name about profile_pic")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      } else {
        post.comments.map((cmnt) => {
          if (cmnt._id.toString() === req.params.commentId.toString()) {
            if (cmnt.posted_By._id.toString() === req.user._id.toString()) {
              Post.findByIdAndUpdate(
                req.params.postId,
                {
                  $pull: { comments: cmnt },
                },
                {
                  new: true,
                }
              )
                .populate("comments.commented_By", "_id name profile_pic")
                .populate("likes", "_id name profile_pic")
                .populate("posted_By", "_id name about profile_pic")
                .exec((err, result) => {
                  if (err) {
                    res.status(422).json({ error: err });
                  } else {
                    res.send(result);
                  }
                });
            } else {
              return res
                .status(422)
                .json({ error: "You can't delete others comment." });
            }
          }
        });
      }
    });
});

module.exports = router;
