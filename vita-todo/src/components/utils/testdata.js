const incomplete = {
  task: "Test",
  subtasks: [
    { name: "First subtask", complete: false },
    { name: "Second subtask", complete: false }
  ],
  complete: false
};
const incompleteTwo = {
  task: "Test",
  subtasks: [
    { name: "First subtask", complete: false },
    { name: "Second subtask", complete: false }
  ],
  complete: false
};
const incompleteThree = {
  task: "Test",
  subtasks: [
    { name: "First subtask", complete: true },
    { name: "Second subtask", complete: true }
  ],
  complete: true
};
const incompleteFour = {
  task: "Test",
  subtasks: [
    { name: "First subtask", complete: true },
    { name: "Second subtask", complete: false }
  ],
  complete: true
};

module.exports = { incomplete, incompleteTwo, incompleteThree, incompleteFour };
