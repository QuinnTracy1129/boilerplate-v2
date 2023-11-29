const mongoose = require("mongoose");

// file
// assets/enrollments/email/:batch/

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["new", "transferee", "repeater", "shifter", "old"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "new",
    },
    gradeLvl: {
      type: Number,
      min: 1,
      max: 17,
      required: true,
    },
    batch: {
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
        required: true,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "pending",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Enrollments", modelSchema);

module.exports = Entity;
