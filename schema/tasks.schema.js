const { Schema, model } = require("mongoose");
const { STATUS } = require("../constants");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      lowercase: true,
    },

    dateOfCompletion: {
      default: Date.now(),
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: STATUS,
      default: STATUS.NEW,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const task = model("task", taskSchema);

module.exports = task;
