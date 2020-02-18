<template>
  <div class="TaskCard">
    <p :class="{ 'is-checked': taskComplete }" id="MainTask">
      {{ this.task.task }}
    </p>
    <input
      class="TaskCheck"
      type="checkbox"
      @change="taskComplete = !taskComplete"
      id="TaskCheck"
    />
    <SubTaskList
      v-if="this.task.subtasks.length > 0"
      :subtasks="this.task.subtasks"
      :complete="taskComplete"
    />
  </div>
</template>

<script>
import SubTaskList from "../subtasklist/subtasklist";

export default {
  name: "TaskCard",
  props: ["task"],
  components: { SubTaskList },
  data() {
    return {
      taskComplete: false
    };
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
</style>
