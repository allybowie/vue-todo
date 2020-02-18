<template>
  <div class="TaskCard">
    <p :class="{ 'is-checked': taskComplete }" id="MainTask">
      {{ this.task.task }}
    </p>
    <input type="checkbox" @change="taskComplete = !taskComplete" />
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
  box-shadow: 2mm 2mm 2mm darkgray;
  border-top: 2mm darkgray;
  /* width: 30%; */
  background-color: rgb(207, 207, 207);

  /* display: flex;
  flex-direction: column; */
}

.SubTaskList {
  background-color: rgb(241, 241, 241);
}
</style>
