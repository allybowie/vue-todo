<template>
  <div>
    <button v-on:click="addToggle = !addToggle" class="AddButton">
      {{ addToggle ? "-" : "+" }}
    </button>
    <form v-if="addToggle === true">
      <input type="text" placeholder="Task" v-model="newTask" />
      <input
        type="text"
        placeholder="Write smaller task steps seperated by a comma and a space here"
        v-model="taskSteps"
      />
      <button
        @click.prevent="
          submitTask({
            task: grammarBro(newTask).name,
            subtasks: splitTasks(taskSteps),
            complete: false
          })
        "
      >
        Add Task
      </button>
    </form>
    <div class="TaskList">
      <article v-for="(task, idx) in tasks" :key="idx">
        <TaskCard :task="task" />
      </article>
    </div>
  </div>
</template>

<script>
import TaskCard from "../taskcard/taskcard";
import store from "../store/store";
import * as type from "../store/mutationtypes/types";
import { mapState } from "vuex";
const { splitTasks, grammarBro } = require("../utils/utils");

export default {
  name: "TaskList",
  components: { TaskCard },
  data() {
    return {
      addToggle: false,
      newTask: "",
      taskSteps: ""
    };
  },
  computed: mapState({
    tasks() {
      return store.state.tasks;
    }
  }),
  methods: {
    grammarBro,
    splitTasks,
    submitTask(addition) {
      this.newTask = "";
      this.taskSteps = "";
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

<style>
.TaskList {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 400px;
}

.AddButton {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  font-size: 40px;
  display: table-cell;
}

.AddButton:focus {
  outline: 0;
}
</style>
