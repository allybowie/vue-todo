<template>
  <div class="TaskCard">
    <p :class="{ 'is-checked': this.task.complete }" id="MainTask">
      <button class="DeleteButton" @click="handleDelete(task)">Delete</button>
      {{ this.task.name }}
    </p>
    <input
      class="TaskCheck"
      type="checkbox"
      @change="toggleComplete(task)"
      :checked="this.task.complete"
      id="TaskCheck"
    />
    <SubTaskList
      v-if="this.task.subtasks.length > 0"
      :subtasks="this.task.subtasks"
      :mainTask="this.task"
    />
    <form class="StepsForm">
      <input
        placeholder="Enter new steps here"
        type="text"
        class="NewStepsInput"
        v-model="newSteps"
      />
      <button
        class="NewStepsButton"
        @click.prevent="handleSubmit(task, newSteps)"
      >
        Add Steps
      </button>
    </form>
  </div>
</template>

<script>
import SubTaskList from "../subtasklist/subtasklist";
import store from "../store/store";
import * as type from "../store/mutationtypes/types";
const { addSteps, splitTasks, deleteTask } = require("../utils/utils");

export default {
  name: "TaskCard",
  props: ["task"],
  components: { SubTaskList },
  data() {
    return {
      taskComplete: false,
      newSteps: ""
    };
  },
  methods: {
    addSteps,
    splitTasks,
    deleteTask,
    toggleComplete(task) {
      store.dispatch({
        type: type.ToggleTaskComplete,
        editedTask: task
      });
    },
    handleSubmit(currentTask, updates) {
      const finalTask = addSteps(currentTask, updates);
      store.state.tasks = store.state.tasks.map(element => {
        if (element.name === currentTask.name) {
          return finalTask;
        }
        return element;
      });
      this.newSteps = "";
    },
    handleDelete(task) {
      const updatedTasks = deleteTask(store.state.tasks, task);
      console.log("NEW TASK ARRAY", updatedTasks);
      store.dispatch({
        type: type.Delete,
        newTasks: updatedTasks
      });
    }
  }
};
</script>

<style>
.is-checked {
  text-decoration: line-through;
}

.TaskCard {
  box-shadow: 1mm 1mm 1mm darkgray;
  border-top: 2mm darkgray;
  background-color: rgb(207, 207, 207);
  display: grid;
  grid-template-columns: auto 10%;
  grid-template-rows: 20px 100px, 100px, auto;
  margin-bottom: 10px;
}

.SubTaskList {
  background-color: rgb(241, 241, 241);
}

.TaskCheck {
  align-self: center;
  height: 50px;
  width: 50px;
}

.NewStepsInput {
  height: 20px;
  width: 60%;
  margin-bottom: 10px;
  margin-left: 40px;
}

.NewStepsButton {
  margin-top: 1px;
  width: 70px;
  height: 25px;
  background-color: darkgray;
}

.StepsForm {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
