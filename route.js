const express = require("express");

const router = express.Router();

router.get("/");

router.patch("/:id");

router.get("/:id");

router.delete("/:id");

router.post("/");

module.exports = router;
