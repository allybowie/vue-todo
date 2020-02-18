const grammarBro = taskString => {
  const split = taskString.split("");
  split[0] = split[0].toUpperCase();
  const finalName = split.join("");
  return { name: finalName, complete: false };
};

const splitTasks = subtaskString => {
  const array = subtaskString === "" ? [] : subtaskString.split(", ");
  return array.map(element => {
    // console.log(element);
    return { name: grammarBro(element).name, complete: false };
  });
};

module.exports = { splitTasks, grammarBro };
