<template>
  <div v-if="complete === false" class="SubTaskCard">
    <p :class="{ 'is-checked': taskComplete }">- {{ this.task.name }}</p>
    <input type="checkbox" class="TaskCheck" id="TaskCheck" />
  </div>
  <div v-else class="SubTaskCard">
    <p class="is-checked">- {{ this.task.name }}</p>
    <input type="checkbox" class="TaskCheck" checked id="TaskCheck" />
  </div>
</template>

<script>
// let elementCheckBox = document.getElementById("TaskCheck");
export default {
  name: "SubTaskCard",
  props: ["task", "complete", "label"],
  data() {
    return {
      taskComplete: document.getElementById("TaskCheck").checked
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
