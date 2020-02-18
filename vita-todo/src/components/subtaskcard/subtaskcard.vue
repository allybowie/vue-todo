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
  </div>
</template>

<script>
import store from "../store/store";
import * as type from "../store/mutationtypes/types";

// v-if="this.task.complete === false"

export default {
  name: "SubTaskCard",
  props: ["task", "complete", "label", "mainTask"],
  data() {
    return {
      taskComplete: false
    };
  },
  methods: {
    toggleComplete(higherTask, subtask) {
      console.log("METHOD", higherTask, subtask);
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
  display: grid;
  grid-template-columns: auto 10%;
}

.TaskCheck {
  align-self: center;
  height: 50px;
  width: 50px;
}
</style>
