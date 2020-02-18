const { expect } = require("chai");
const { splitTasks, grammarBro } = require("./utils");

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
