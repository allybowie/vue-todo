<template>
  <div id="app">
    <div class="Content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(41, 41, 41);
  margin-top: 60px;
  display: grid;
  grid-template-columns: 35% auto 35%;
}

.Content {
  grid-column: 2/3;
}
</style>
