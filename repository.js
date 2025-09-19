const task = require("./schema/tasks.schema");

const TaskRepository = {
  create: async (data) => {
    const newTask = await task.create(data);
    await newTask.save();

    return newTask;
  },

  getTask: async (query) => {
    let filter = {};

    if (query) {
      filter = { ...filter, query };
    }
    const tasks = await task.get(filter);

    return tasks;
  },
};

module.exports = TaskRepository;
