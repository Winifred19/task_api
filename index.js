const express = require("express");
const app = express();
const taskRouter = require("./route");
const dbConnection = require("./database/db");
const authRouter = require("./userRoutes");

app.use(express.json()); // allows us to return json

dbConnection();
// health route to check that server is up
app.get("/", (req, res) => {
  res.send("server is up");
});

// task routes
app.use("/tasks", taskRouter);

// auth routes
app.use("/auth", authRouter);

// telling the server the port to listen on

app.listen(3000, () => {
  console.log("server running on port 3000");
});
