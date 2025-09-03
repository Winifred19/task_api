const express = require("express");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("./controller");

// prefix for this routes is "/tasks"

const router = express.Router();

router.get("/", getTask); // to get task data

router.patch("/:id", updateTask); // to update task data

router.get("/:id", getTaskById); // to get a specific task data by id

router.delete("/:id", deleteTask); // to delete task data

// create a new task

router.post("/create", createTask); // to add a new task data

module.exports = router;
