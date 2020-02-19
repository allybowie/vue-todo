<template>
  <div class="SubTaskCard">
    <p :class="{ 'is-checked': this.task.complete }">- {{ this.task.name }}</p>

    <input
      type="checkbox"
      class="TaskCheck"
      id="TaskCheck"
      :checked="this.task.complete"
      @change="toggleComplete(mainTask, task)"
    />
    <button class="StepDeleteButton" @click="handleStepDelete(task)">X</button>
  </div>
</template>

<script>
import store from "../store/store";
import * as type from "../store/mutationtypes/types";
const { deleteTask } = require("../utils/utils");

export default {
  name: "SubTaskCard",
  props: ["task", "complete", "label", "mainTask"],
  data() {
    return {
      taskComplete: false
    };
  },
  methods: {
    deleteTask,
    handleStepDelete(step) {
      const newTask = deleteTask(this.mainTask.subtasks, step);

      this.mainTask.subtasks = newTask;

      let taskComplete = true;

      this.mainTask.subtasks.forEach(element => {
        if (element.complete === false) taskComplete = false;
      });

      this.mainTask.complete = taskComplete;
    },
    toggleComplete(higherTask, subtask) {
      store.dispatch({
        type: type.ToggleSubtaskComplete,
        editedTask: subtask,
        mainTask: higherTask
      });
    }
  }
};
</script>

<style>
.is-checked {
  text-decoration: line-through;
}

.SubTaskCard {
  box-shadow: 2mm 2mm 2mm darkgray;
  border-top: 2mm darkgray;
  background-color: rgb(221, 221, 221);
  margin-left: 15%;
  margin-bottom: 10px;
  width: 90%;
  display: flex;
  display: grid;
  grid-template-columns: 70% 15% 15%;
}

.TaskCheck {
  grid-column: 2/3;
  height: 50px;
  width: 50px;
}

.StepDeleteButton {
  height: 20px;
  width: 25px;
  grid-column: 3/4;
  margin-top: 17px;
  text-align: center;
  background-color: darkgrey;
}
</style>
