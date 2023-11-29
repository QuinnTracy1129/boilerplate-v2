const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    text: {
      blocks: [],
      entityMap: {},
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    files: [
      {
        type: String,
        default: "",
      },
    ],
    priority: {
      type: String,
      enum: {
        values: ["urgent", "special", "normal"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "normal",
    },
    reacts: {
      like: {
        type: Number,
        default: 0,
      },
      laugh: {
        type: Number,
        default: 0,
      },
      heart: {
        type: Number,
        default: 0,
      },
      care: {
        type: Number,
        default: 0,
      },
      wow: {
        type: Number,
        default: 0,
      },
      angry: {
        type: Number,
        default: 0,
      },
      sad: {
        type: Number,
        default: 0,
      },
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

const Entity = mongoose.model("Announcements", modelSchema);

module.exports = Entity;
