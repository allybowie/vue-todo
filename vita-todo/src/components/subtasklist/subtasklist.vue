<template>
  <div>
    <article v-for="(task, idx) in this.subtasks" :key="idx">
      <SubTaskCard :task="task" :complete="complete" />
    </article>
  </div>
</template>

<script>
import SubTaskCard from "../subtaskcard/subtaskcard";
export default {
  name: "SubTaskList",
  props: ["subtasks", "complete"],
  components: { SubTaskCard }
};
</script>
