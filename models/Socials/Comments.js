const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcements",
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    hidden: {
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      at: {
        type: String,
        default: "",
      },
      for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Violations",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Comments", modelSchema);

module.exports = Entity;
