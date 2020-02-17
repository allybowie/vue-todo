<template>
  <div id="app">
    <Date />
    <Header />
    <button v-on:click="addToggle = !addToggle">
      {{ addToggle ? "Close Task Adder" : "Open Task Adder" }}
    </button>
    <form v-if="addToggle === true">
      <input type="text" placeholder="Task" />
    </form>
    <TaskList />
    <AddTask />
  </div>
</template>

<script>
import Header from "./components/header/header";
import Date from "./components/date/date";
import TaskList from "./components/tasklist/tasklist";

export default {
  name: "App",
  components: { Header, Date, TaskList },
  data() {
    return {
      tasks: [
        {
          task: "Make to do list",
          subtasks: ["Create Vue App", "Make it functional"]
        }
      ],
      addToggle: false,
      addIcon: "+"
    };
  }
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
