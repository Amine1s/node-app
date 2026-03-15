const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogeSchema);
module.exports = Blog;
