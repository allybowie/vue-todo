<template>
  <div>
    <p>{{ this.task.task }}</p>
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
