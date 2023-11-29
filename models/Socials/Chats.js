const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    // actions: [
    //   {
    //     type: "greeting",
    //     message: "Always be mindful when chatting with others.",
    //   },
    //   {
    //     type: "changeName",
    //     message: "changed the chat name",
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     },
    //   },
    //   {
    //     type: "removeName",
    //     message: "removed the chat name",
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     },
    //   },
    //   {
    //     type: "addedParticipant",
    //     message: "added",
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     },
    //     friend: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Chats", modelSchema);

module.exports = Entity;
