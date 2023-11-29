const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      default: "",
    },
    violation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Violations",
    },
    cause: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Warnings", modelSchema);

module.exports = Entity;
