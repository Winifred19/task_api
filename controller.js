let tasks = [];

getTask = (req, res) => {
  res.json(tasks);
};

createTask = (req, res) => {
  const newTask = req.body;
  const task = (name: newTask.name);
  tasks.push(newTask);

  res.json(newTask);
};
