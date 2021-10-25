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
  const arr = req.user.connections;
  arr.push(req.user._id);
  Post.find({ posted_By: { $in: arr } })
    .populate("posted_By", "_id name headline profile_pic ")
    .populate("comments.commented_By", "_id name headline profile_pic")
    .sort("-createdAt")
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      return res.json({ err });
    });
});

router.get("/mypost/:userid", requireLogin, (req, res) => {
  Post.find({ posted_By: req.params.userid })
    .populate("posted_By", "_id name headline profile_pic")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .then((post) => {
      if (post.likes.includes(req.user._id)) {
        return res.status(422).json({ error: "Something went wromg" });
      } else {
        Post.findByIdAndUpdate(
          req.body.postId,
          {
            $push: { likes: req.user._id },
          },
          {
            new: true,
          }
        )
          .populate("posted_By", "_id name headline profile_pic")
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
    .populate("posted_By", "_id name headline profile_pic")
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

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name headline profile_pic")
    .populate("posted_By", "_id name headline profile_pic")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (req.user._id.toString() === post.posted_By._id.toString()) {
        post
          .remove()
          .then((post) => res.json({ post }))
          .catch((err) => console.log(err));
      }
    });
});

router.put("/editpost/:postId", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      title: req.body.title,
      photo: req.body.photo,
    },
    {
      new: true,
    }
  )
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name headline profile_pic")
    .populate("posted_By", "_id name headline profile_pic")
    .exec((err, post) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json({ post });
      }
    });
});

router.put("/deletecomment", requireLogin, (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name headline profile_pic")
    .populate("posted_By", "_id name headline profile_pic")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      } else {
        post.comments.map((cmnt) => {
          console.log(cmnt);
          if (cmnt._id.toString() === req.body.commentId.toString()) {
            if (cmnt.commented_By._id.toString() === req.user._id.toString()) {
              Post.findByIdAndUpdate(
                req.body.postId,
                {
                  $pull: { comments: cmnt },
                },
                {
                  new: true,
                }
              )
                .populate("comments.commented_By", "_id name profile_pic")
                .populate("likes", "_id name headline profile_pic")
                .populate("posted_By", "_id name headline profile_pic")
                .exec((err, result) => {
                  if (err) {
                    res.status(422).json({ error: err });
                  } else {
                    res.json({ result });
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

router.get("/post/:postid", requireLogin, (req, res) => {
  Post.findById(req.params.postid)
    .populate("posted_By", "_id name headline profile_pic")
    .populate("comments.commented_By", "_id name profile_pic")
    .populate("likes", "_id name headline profile_pic")
    .then((post) => res.json({ post }))
    .catch((err) => console.log(err));
});

module.exports = router;
