const task = require("./schema/tasks.schema");

const TaskRepository = {
  create: async (data) => {
    const newTask = await task.create(data);
    await newTask.save();

    return newTask;
  },

  getTasks: async (query) => {
    let filter = {};

    if (query) {
      filter = { ...filter, query };
    }
    const tasks = await task.find(filter).exec();

    return tasks;
  },

  getTask: async (id) => {
    const taskData = await task.findById(id).exec();

    return taskData;
  },

  updateTask: async (filter, data) => {
    const updatedTask = await task.findOneAndUpdate(filter, data);

    return updatedTask;
  },

  deleteTask: async (id) => {
    const deletedTask = await task.findByIdAndDelete(id);

    return deletedTask;
  },
};

module.exports = TaskRepository;
