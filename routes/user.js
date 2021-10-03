const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middleware/requireLogin");

router.put("/editdetails", requireLogin, (req, res) => {
  const { name, email, about, address, profile_pic, cover_pic } = req.body;

  if (email === req.user.email) {
    var EmailChanged = false;
  } else {
    var EmailChanged = true;
  }

  if (!EmailChanged) {
    User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        about,
        address,
        profile_pic,
        cover_pic,
      },
      {
        new: true,
      }
    )
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  } else {
    User.findOne({ email }).then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exits in this email" });
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          {
            name,
            email,
            about,
            address,
            profile_pic,
            cover_pic,
          },
          {
            new: true,
          }
        )
          .then((user) => {
            res.status(200).json({ user });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
  }

  if (!email || !name) {
    return res.status(422).json({ error: "Email and Name are Required" });
  } else {
    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser & (savedUser._id !== req.user._id)) {
        return res
          .status(422)
          .json({ error: "User already exits in this email" });
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          {
            name,
            email,
            about,
            address,
            profile_pic,
            cover_pic,
          },
          {
            new: true,
          }
        )
          .then((user) => {
            res.status(200).json({ user });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    });
  }
});

router.put("/reqconnect/:userid", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid,
    {
      $push: { conrequests: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((result1) => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { myrequests: req.params.userid },
        },
        {
          new: true,
        }
      )
        .populate("connections", "_id name about profile_pic cover_pic")
        .populate("conrequests", "_id name about profile_pic cover_pic")
        .populate("myrequests", "_id name about profile_pic cover_pic")
        .then((result2) => res.json({ result1, result2 }))
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/acceptconnect/:userid", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { connections: req.params.userid },
      $pull: { conrequests: req.params.userid },
    },
    {
      new: true,
    }
  )
    .populate("connections", "_id name about profile_pic cover_pic")
    .populate("conrequests", "_id name about profile_pic cover_pic")
    .populate("myrequests", "_id name about profile_pic cover_pic")
    .then((result1) =>
      User.findByIdAndUpdate(
        req.params.userid,
        {
          $push: { connections: req.user._id },
          $pull: { myrequests: req.user._id },
        },
        {
          new: true,
        }
      )
        .then((result2) => res.json({ result1, result2 }))
        .catch((err) => {
          return res.status(422).json({ error: err });
        })
    )
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/rejectconnect/:userid", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { conrequests: req.params.userid },
    },
    {
      new: true,
    },
    (err, result1) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        User.findByIdAndUpdate(
          req.params.userid,
          {
            $pull: { myrequests: req.user._id },
          },
          {
            new: true,
          },
          (err, result2) => {
            if (err) {
              return res.status(422).json({ error: err });
            } else {
              res.json({ result1, result2 });
            }
          }
        );
      }
    }
  );
});

router.put("/removeconnect/:userid", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { connections: req.params.userid },
    },
    {
      new: true,
    },
    (err, result1) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        User.findByIdAndUpdate(
          req.params.userid,
          {
            $pull: { connections: req.user._id },
          },
          {
            new: true,
          },
          (err, result2) => {
            if (err) {
              return res.status(422).json({ error: err });
            } else {
              res.json({ result1, result2 });
            }
          }
        );
      }
    }
  );
});

router.get("/user/:userid", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.userid })
    .select("-password")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      return res.status(404).json({ error: err });
    });
});

router.get("/mydetails", requireLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("-password")
    .populate("connections", "_id name about profile_pic cover_pic")
    .populate("conrequests", "_id name about profile_pic cover_pic")
    .populate("myrequests", "_id name about profile_pic cover_pic")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      return res.status(404).json({ error: err });
    });
});

router.get("/alluser", requireLogin, (req, res) => {
  User.find()
    .select("-password")
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      return res.status(404).json({ error: err });
    });
});

router.put("/addeducation", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { education: req.body.education },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/deleteeducation", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { education: req.body.education },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/updateeducation", requireLogin, (req, res) => {
  const newEducation = req.user.education.map((edu) => {
    if (edu._id.toString() === req.body.education._id.toString()) {
      return req.body.education;
    } else {
      return edu;
    }
  });

  console.log(newEducation);

  User.findByIdAndUpdate(
    req.user._id,
    {
      education: newEducation,
    },
    {
      new: true,
    }
  )
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/addskill", requireLogin, (req, res) => {
  if (req.body.skill === null || "") {
    return res.status(422).json({ error: "Not found" });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { skills: req.body.skill },
      },
      {
        new: true,
      }
    )
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  }
});

router.put("/deleteskill", requireLogin, (req, res) => {
  if (req.body.skill === null || "") {
    return res.status(422).json({ error: "Not found" });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { skills: req.body.skill },
      },
      {
        new: true,
      }
    )
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  }
});

module.exports = router;
