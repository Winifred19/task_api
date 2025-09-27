const express = require("express");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("./controller");
const AuthMiddleware = require("./middleware/authMiddleware");

// prefix for this routes is "/tasks"

const router = express.Router();

router.get("/", AuthMiddleware, getTask); // to get task data

router.patch("/:id", AuthMiddleware, updateTask); // to update task data

router.get("/:id", AuthMiddleware, getTaskById); // to get a specific task data by id

router.delete("/:id", AuthMiddleware, deleteTask); // to delete task data

// create a new task

router.post("/create", createTask); // to add a new task data

module.exports = router;
