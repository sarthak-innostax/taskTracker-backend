const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    image: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);
