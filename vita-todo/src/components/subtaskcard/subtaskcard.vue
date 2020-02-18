<template>
  <div v-if="complete === false" class="SubTaskCard">
    <p :class="{ 'is-checked': taskComplete }">- {{ this.task }}</p>
    <input type="checkbox" @change="taskComplete = !taskComplete" />
  </div>
  <div v-else>
    <p class="is-checked">- {{ this.task }}</p>
    <input type="checkbox" checked @change="taskComplete = !taskComplete" />
  </div>
</template>

<script>
export default {
  name: "SubTaskCard",
  props: ["task", "complete", "label"],
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

.SubTaskCard {
  box-shadow: 2mm 2mm 2mm darkgray;
  border-top: 2mm darkgray;
  background-color: rgb(221, 221, 221);
  margin-left: 5%;
  width: 90%;
}
</style>
