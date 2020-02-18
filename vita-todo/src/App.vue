<template>
  <div id="app">
    <div class="Content">
      <Date />
      <Header />
      <TaskList />
    </div>
  </div>
</template>

<script>
import Header from "./components/header/header";
import Date from "./components/date/date";
import TaskList from "./components/tasklist/tasklist";

export default {
  name: "App",
  components: { Header, Date, TaskList }
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
