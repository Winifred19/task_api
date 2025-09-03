const express = require("express");
const app = express();
const taskRouter = require("./route");

app.use(express.json()); // allows us to return json

// health route to check that server is up
app.get("/", (req, res) => {
  res.send("server is up");
});

// task routes
app.use("/tasks", taskRouter);

// telling the server the port to listen on

app.listen(3000, () => {
  console.log("server running on port 3000");
});
