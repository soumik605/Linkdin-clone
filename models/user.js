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
  headline: {
    type: String,
  },
  about: {
    type: String,
    default: "Hello everyone !!",
  },
  profile_pic: {
    type: String,
    default:
      "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
  },
  cover_pic: {
    type: String,
    default:
      "https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png",
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
