<template>
  <div id="app">
    <Date />
    <Header />
    <TaskList />
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
