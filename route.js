const express = require("express");
const { getTask, createTask, updateTask } = require("./controller");

const router = express.Router();

router.get("/", getTask);

router.patch("/:id", updateTask);

// router.get("/:id");

// router.delete("/:id");

// create a new task

router.post("/create", createTask);

module.exports = router;
