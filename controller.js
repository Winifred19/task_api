let tasks = [];

getTask = (req, res) => {
  res.json(tasks);
};

createTask = (req, res) => {
  // get the request body

  const body = req.body;

  // validate the request body

  const { taskName, description, completionDate, status } = body;

  if (!taskName || !description || !completionDate || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // create a new task object,

  const newTask = {
    id: tasks.length + 1,
    name: taskName,
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
    task: newTask,
  });
};

updateTask = (req, res) => {
  // get the task id from the request params

  const { id } = req.params;

  // find the task using the id
  const existingTask = tasks.find((task) => task.id === parseInt(id));

  // throw error if task not found
  if (!existingTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updateData = req.body;

  // update the task properties

  const updatedTask = {
    id: existingTask.id,
    name: updateData.taskName || existingTask.name,
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
    task: updatedTask,
  });
};

module.exports = {
  getTask,
  createTask,
  updateTask,
};
