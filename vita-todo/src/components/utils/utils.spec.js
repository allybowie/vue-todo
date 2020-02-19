const { expect } = require("chai");
const {
  splitTasks,
  grammarBro,
  flipMainTaskComplete,
  flipSubtaskComplete
  // searchTasks
} = require("./utils");
const {
  incomplete,
  incompleteTwo,
  incompleteThree,
  incompleteFour,
  incompleteFive,
  incompleteSix,
  incompleteSeven,
  incompleteEight,
  incompleteNine,
  incompleteTen
} = require("./testdata");

//Split Tasks
describe("splitTasks will split a string of subtasks seperated by commas into an array", () => {
  it("Returns an empty array when an empty string is passed", () => {
    expect(splitTasks("")).to.be.an("array");
    expect(splitTasks("")).to.have.length(0);
  });
  it("Returns an array of length 1 when a string with no commas is passed", () => {
    expect(splitTasks("example small task")).to.have.length(1);
  });
  it("Returns an array of correct length when a string that includes commas is passed", () => {
    expect(splitTasks("example small task, second task")).to.have.length(2);
    expect(
      splitTasks("example small task, second task, third task")
    ).to.have.length(3);
  });
  it("Makes sure there is no whitespace at the start of each element in the returned array", () => {
    const testTasks = splitTasks("example small task, second task, third task");
    expect(testTasks).to.have.length(3);
    expect(testTasks[1]).to.eql({ name: "Second task", complete: false });
  });
  it("Ensures each subtask name begins with an uppercase letter", () => {
    const testTasks = splitTasks("example small task, second task, third task");
    expect(testTasks).to.have.length(3);
    expect(testTasks[1]).to.eql({ name: "Second task", complete: false });
  });
});

// Grammar Bro
describe("Grammar Bro: Makes sure the first letter of the task is uppercase", () => {
  it("returns an object", () => {
    expect(grammarBro("test")).to.be.an("object");
  });
  it("returns the correct uppercase letter at the start of the task", () => {
    expect(grammarBro("test")).to.eql({ name: "Test", complete: false });
  });
  it("Only affects the first word in the task", () => {
    expect(grammarBro("test string of task")).to.eql({
      name: "Test string of task",
      complete: false
    });
  });
});

//mark task and all subtasks to complete
describe("Flip the 'Complete' status of a task and all of its subtasks", () => {
  it("returns an object", () => {
    expect(flipMainTaskComplete(incomplete)).to.be.an("object");
  });
  it("returns an object with the keys 'task', 'subtasks', 'complete'", () => {
    expect(flipMainTaskComplete(incomplete)).to.contain.all.keys([
      "task",
      "complete",
      "subtasks"
    ]);
  });
  it("returns an object where the 'complete' boolean is flipped", () => {
    expect(flipMainTaskComplete(incomplete).complete).to.eql(true);
  });
  it("keeps the subtasks in an array", () => {
    expect(flipMainTaskComplete(incomplete).subtasks).to.be.an("array");
    expect(flipMainTaskComplete(incomplete).subtasks).to.have.length(2);
  });
  it("flips the complete booleans of all subtasks in the subtask key", () => {
    expect(flipMainTaskComplete(incomplete).subtasks[0]).to.be.an("object");
    expect(flipMainTaskComplete(incompleteTwo).subtasks[0].complete).to.eql(
      true
    );
  });
  it("returns all tasks as incomplete when the input main task is marked as complete", () => {
    expect(flipMainTaskComplete(incompleteThree).complete).to.eql(false);
    expect(flipMainTaskComplete(incompleteFour).subtasks[0].complete).to.eql(
      false
    );
  });
});

describe("Flip the 'Completed' status of a single subtask", () => {
  it("returns an object", () => {
    expect(flipSubtaskComplete(incomplete, "First subtask")).to.be.an("object");
  });
  it("returns an object identical to the input object, but with one subtask's Completed status flipped", () => {
    expect(
      flipSubtaskComplete(incompleteSix, "First subtask").subtasks[0].complete
    ).to.eql(true);
  });
  it("flips the 'completed' status of the correct subtask", () => {
    expect(flipSubtaskComplete(incompleteFive, "Second subtask")).to.eql({
      task: "Test",
      subtasks: [
        { name: "First subtask", complete: true },
        { name: "Second subtask", complete: true }
      ],
      complete: true
    });
  });
  it("completes the main task is all subtasks are complete", () => {
    expect(flipSubtaskComplete(incompleteSeven, "Second subtask")).to.eql({
      task: "Test",
      subtasks: [
        { name: "First subtask", complete: true },
        { name: "Second subtask", complete: true }
      ],
      complete: true
    });
  });
  it("unmarks the main task as completed if a completed subtask is unchecked", () => {
    expect(flipSubtaskComplete(incompleteEight, "Second subtask")).to.eql({
      task: "Test",
      subtasks: [
        { name: "First subtask", complete: true },
        { name: "Second subtask", complete: false }
      ],
      complete: false
    });
  });
  it("doesn't change the status of the main task if one out of two subtasks becomes true", () => {
    expect(flipSubtaskComplete(incompleteNine, "Second subtask")).to.eql({
      task: "Test",
      subtasks: [
        { name: "First subtask", complete: false },
        { name: "Second subtask", complete: true }
      ],
      complete: false
    });
  });
});

// describe("Search an array and run flip the complete status on a task with matching ID", () => {
//   it("returns ", () => {});
// });
