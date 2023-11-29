const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    violation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Violations",
    },
    comment: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "validated", "rejected"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Reports", modelSchema);

module.exports = Entity;
