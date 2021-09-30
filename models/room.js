const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const roomSchema = new mongoose.Schema({
  members: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      posted_By: { type: ObjectId, ref: "User" },
      message: String,
    },
  ],
});

mongoose.model("Room", roomSchema);
