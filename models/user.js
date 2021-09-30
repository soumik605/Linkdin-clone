const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  about: {
    type: String,
    default: "Hello everyone !!",
  },
  profile_pic: {
    type: String,
    default: "",
  },
  cover_pic: {
    type: String,
    default: "",
  },
  connections: [{ type: ObjectId, ref: "User" }],
  conrequests: [{ type: ObjectId, ref: "User" }],
  myrequests: [{ type: ObjectId, ref: "User" }],
  education: [
    {
      course: String,
      institute: String,
      passyear: Number,
    },
  ],
  address: { type: String, default: "" },
  skills: [{ type: String }],
});

mongoose.model("User", userSchema);
