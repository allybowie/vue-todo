const grammarBro = taskString => {
  const split = taskString.split("");
  split[0] = split[0].toUpperCase();
  const finalName = split.join("");
  return { name: finalName, complete: false };
};

const splitTasks = subtaskString => {
  const array = subtaskString === "" ? [] : subtaskString.split(", ");
  return array.map(element => {
    return { name: grammarBro(element).name, complete: false };
  });
};

const isTaskUnique = (newTask, stateTasks) => {
  const identicalTask = stateTasks.filter(element => {
    return element.name === newTask.name;
  });
  if (identicalTask.length > 0) return false;

  return true;
};

const isStepUnique = (newTask, stateTasks) => {
  const identicalTask = stateTasks.filter(element => {
    return element.name === newTask.name;
  });
  if (identicalTask.length > 0) return false;

  return true;
};

const flipMainTaskComplete = task => {
  task.complete = !task.complete;
  task.subtasks.forEach(subtask => {
    subtask.complete = task.complete;
  });
  return task;
};

const flipSubtaskComplete = (fullTask, subtask) => {
  fullTask.subtasks = fullTask.subtasks.map(element => {
    if (element.name === subtask) {
      element.complete = !element.complete;
      return element;
    }
    return element;
  });

  const isNotComplete = fullTask.subtasks.filter(element => {
    if (element.complete === true) return element;
  });

  if (isNotComplete.length === fullTask.subtasks.length) {
    fullTask.complete = true;
  } else {
    fullTask.complete = false;
  }

  return fullTask;
};

const addSteps = (task, steps) => {
  const splitSteps = splitTasks(steps);

  const filteredSteps = splitSteps.filter(element => {
    if (isStepUnique(element, task.subtasks) === true) {
      return element;
    }
  });
  task.subtasks = [...task.subtasks, ...filteredSteps];
  task.complete = false;
  return task;
};

const deleteTask = (stateTasks, removal) => {
  const filtered = stateTasks.filter(element => {
    if (element.name !== removal.name) {
      return element;
    }
  });
  return filtered;
};

module.exports = {
  splitTasks,
  grammarBro,
  flipMainTaskComplete,
  flipSubtaskComplete,
  isTaskUnique,
  addSteps,
  deleteTask
};
