const { Schema, model } = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
