let tasks = [];

getTask = (req, res) => {
  res.json({
    staus: 200,
    message: "Tasks fetched successfully",
    data: tasks,
  });
};

createTask = (req, res) => {
  // get the request body

  const body = req.body;

  // validate the request body

  const { name, description, completionDate, status } = body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }

  if (!completionDate) {
    return res.status(400).json({ error: "completionDate is required" });
  }

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  // create a new task object,

  const newTask = {
    id: tasks.length + 1,
    name,
    description,
    completionDate,
    status,
    createdAt: new Date().toISOString(),
  };

  // add it to the tasks array

  tasks.push(newTask);

  // return the new task as a response

  res.json({
    status: 201,
    message: "Task created successfully",
    data: newTask,
  });
};

updateTask = (req, res) => {
  // get the task id from the request params

  const { id } = req.params; // destructuring

  // find the task using the id
  const existingTask = tasks.find((task) => task.id === +id);
  console.log(tasks);
  // throw error if task not found
  if (!existingTask) {
    return res.status(404).json({
      message: "Task not found",
      data: {},
      error: "Task not found",
    });
  }

  const updateData = req.body;

  // update the task properties

  const updatedTask = {
    id: existingTask.id,
    name: updateData.name || existingTask.name,
    description: updateData.description || existingTask.description,
    completionDate: updateData.completionDate || existingTask.completionDate,
    status: updateData.status || existingTask.status,
  };

  // find the index of the existing task
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  // update the task in the tasks array

  tasks[taskIndex] = updatedTask;

  // return the updated task as a response
  res.json({
    status: 200,
    message: "Task updated successfully",
    data: updatedTask,
  });
};

deleteTask = (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const deleted = tasks.splice(taskIndex, 1);
  res.json({
    status: 200,
    message: "Task deleted successfully",
    data: { deleted },
  });
};

getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({
    status: 200,
    message: "Task fetched successfully",
    data: task,
  });
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
