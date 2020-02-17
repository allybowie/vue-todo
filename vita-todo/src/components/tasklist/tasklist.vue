<template>
  <div>
    <p>Task List</p>
    <AddTask />
    <article v-for="(task, idx) in this.tasks" :key="idx">
      <TaskCard :task="task" />
    </article>
  </div>
</template>

<script>
import TaskCard from "../taskcard/taskcard";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [
        {
          task: "Make to do list",
          subtasks: ["Create Vue App", "Make it functional"]
        }
      ]
    };
  },
  components: { TaskCard }
};
</script>
