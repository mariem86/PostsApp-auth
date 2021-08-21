const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", postSchema);
