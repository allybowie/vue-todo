<template>
  <div>
    <h1>Task List</h1>
    <button v-on:click="addToggle = !addToggle">
      {{ addToggle ? "Close Task Adder" : "Open Task Adder" }}
    </button>
    <form v-if="addToggle === true">
      <input type="text" placeholder="Task" v-model="newTask" />
      <button @click.prevent="submitTask({ task: newTask, subtasks: [] })">
        Add Task
      </button>
    </form>
    <article v-for="(task, idx) in tasks" :key="idx">
      <TaskCard :task="task" />
    </article>
  </div>
</template>

<script>
import TaskCard from "../taskcard/taskcard";
import store from "../store/store";
import * as type from "../store/mutationtypes/types";
import { mapState } from "vuex";

export default {
  name: "TaskList",
  components: { TaskCard },
  data() {
    return {
      addToggle: false,
      newTask: ""
    };
  },
  computed: mapState({
    tasks() {
      return store.state.tasks;
    }
  }),
  methods: {
    submitTask(addition) {
      this.newTask = "";
      setTimeout(() => (this.addToggle = false), 200);
      setTimeout(
        () =>
          store.dispatch({
            type: type.Add,
            addedTask: addition
          }),
        200
      );
    }
  }
};
</script>
