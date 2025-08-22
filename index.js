const express = require("express");
const app = express();
const taskRouter = require("./route");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is up");
});

// task routes
app.use("/tasks", taskRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
