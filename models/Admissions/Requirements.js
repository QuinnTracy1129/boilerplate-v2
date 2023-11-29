const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: {
        values: ["grade", "junior", "senior", "college"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "grade",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Requirements", modelSchema);

module.exports = Entity;
