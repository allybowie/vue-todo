<template>
  <div v-if="complete === false">
    <p>{{ this.task }}</p>
    <input type="checkbox" />
  </div>
  <div v-else>
    <p>{{ this.task }}</p>
    <input type="checkbox" checked />
  </div>
</template>

<script>
export default {
  name: "SubTaskCard",
  props: ["task", "complete"]
};
</script>
