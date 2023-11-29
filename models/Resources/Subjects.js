const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    abbreviation: {
      type: String,
      trim: true,
    },
    units: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    gradeLvl: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isMajor: {
      type: Boolean,
      default: false,
    },
    lab: {
      type: Number,
    },
    lec: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Subjects", modelSchema);

module.exports = Entity;
