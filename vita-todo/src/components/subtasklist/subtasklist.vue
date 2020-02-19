<template>
  <div class="Steps">
    <article v-for="(task, idx) in this.subtasks" :key="idx">
      <SubTaskCard :task="task" :complete="complete" :mainTask="mainTask" />
    </article>
  </div>
</template>

<script>
import SubTaskCard from "../subtaskcard/subtaskcard";
export default {
  name: "SubTaskList",
  props: ["subtasks", "complete", "mainTask"],
  components: { SubTaskCard }
};
</script>

<style>
.Steps {
  grid-row: 3/4;
}
</style>
