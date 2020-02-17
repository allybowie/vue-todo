<template>
  <div>
    <p>{{ this.task }}</p>
    <input type="checkbox" />
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task", "complete"]
};
</script>
