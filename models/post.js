const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    photo: {
      type: String,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: String,
        commented_By: { type: ObjectId, ref: "User" },
      },
    ],
    posted_By: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

mongoose.model("Post", postSchema);
