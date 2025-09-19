const TaskRepository = require("./repository");

getTask = async (req, res) => {
  try {
    const tasks = await TaskRepository.getTask();

    res.json({
      status: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

createTask = async (req, res) => {
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

  const data = {
    id: tasks.length + 1,
    name,
    description,
    completionDate,
    status,
    createdAt: new Date().toISOString(),
  };

  // add it to the tasks array

  const createdTask = await TaskRepository.create(data);

  // return the new task as a response

  res.json({
    status: 201,
    message: "Task created successfully",
    data: createdTask,
  });
};

updateTask = async (req, res) => {
  // get the task id from the request params

  const { id } = req.params; // destructuring

  // find the task using the id
  const existingTask = await TaskRepository.getTask(id);

  // throw error if task not found
  if (!existingTask) {
    return res.status(404).json({
      status: false,
      message: "Invalid task Id",
      error: "Invalid task ID",
    });
  }

  const updateData = req.body;

  // update the task properties

  const updateTaskData = {
    name: updateData.name || existingTask.name,
    description: updateData.description || existingTask.description,
    completionDate: updateData.completionDate || existingTask.completionDate,
    status: updateData.status || existingTask.status,
  };

  const updatedTask = await TaskRepository.updateTask({ id }, updateTaskData);

  // return the updated task as a response
  res.json({
    status: 200,
    message: "Task updated successfully",
    data: updatedTask,
  });
};

deleteTask = async (req, res) => {
  const { id } = req.params;
  // destructuring

  // find the task using the id
  const existingTask = await TaskRepository.getTask(id);

  // throw error if task not found
  if (!existingTask) {
    return res.status(404).json({
      status: false,
      message: "Invalid task Id",
      error: "Invalid task ID",
    });
  }

  const deleted = TaskRepository.deleteTask(id);
  res.json({
    status: true,
    message: "Task deleted successfully",
    data: deleted,
  });
};

getTaskById = async (req, res) => {
  const { id } = req.params; // destructuring

  // find the task using the id
  const existingTask = await TaskRepository.getTask(id);

  // throw error if task not found
  if (!existingTask) {
    return res.status(404).json({
      status: false,
      message: "Invalid task Id",
      error: "Invalid task ID",
    });
  }

  res.json({
    status: true,
    message: "Task fetched successfully",
    data: existingTask,
  });
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
