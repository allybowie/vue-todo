const grammarBro = taskString => {
  const split = taskString.split("");
  split[0] = split[0].toUpperCase();
  return split.join("");
};

const splitTasks = subtaskString => {
  const array = subtaskString === "" ? [] : subtaskString.split(", ");
  return array.map(element => {
    return grammarBro(element);
  });
};

module.exports = { splitTasks, grammarBro };
