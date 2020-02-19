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
    return element.task === newTask.task;
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
  task.subtasks = [...task.subtasks, ...splitTasks(steps)];
  return task;
};

module.exports = {
  splitTasks,
  grammarBro,
  flipMainTaskComplete,
  flipSubtaskComplete,
  isTaskUnique,
  addSteps
};
