<template>
  <div>
    <button v-on:click="addToggle = !addToggle" class="AddButton">
      {{ addToggle ? "-" : "+" }}
    </button>
    <form v-if="addToggle === true" class="Form">
      <input type="text" placeholder="Task" v-model="newTask" class="Input" />
      <input
        type="text"
        placeholder="Steps"
        v-model="taskSteps"
        class="Input"
      />
      <button
        @click.prevent="
          submitTask({
            name: grammarBro(newTask).name,
            subtasks: splitTasks(taskSteps),
            complete: false
          })
        "
        class="TaskSubmit"
      >
        Add Task
      </button>
    </form>
    <p v-if="loading">Loading your to-do list!</p>
    <p v-if="!loading">Hello {{ firstName }}</p>
    <p v-if="tasks.length === 0 && loading === false">
      {{
        addToggle
          ? "Write a task and click 'Add' to submit a task. \n\n To split a task into individual steps, type the steps into the box on the right hand side, seperated by commas"
          : "Your task list is empty. Click the button above to fill it up!"
      }}
    </p>
    <div class="TaskList" v-if="!loading">
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
import { db } from "@/main";
import firebase from "firebase/app";

const { splitTasks, grammarBro, isTaskUnique } = require("../utils/utils");

export default {
  name: "TaskList",
  components: { TaskCard },
  data() {
    return {
      addToggle: false,
      newTask: "",
      taskSteps: "",
      loading: true
    };
  },
  computed: mapState({
    tasks() {
      return store.state.tasks;
    },
    firstName() {
      return store.state.firstName;
    }
  }),
  mounted() {
    const userID = firebase.auth().currentUser.uid;
    const docRef = db.collection("UserCollection").doc(userID);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const userTasks = doc.data().tasks;
          const firstName = doc.data().firstName;
          const lastName = doc.data().surName;
          store.dispatch({
            type: type.SetTasks,
            userTasks: userTasks,
            firstName: firstName,
            lastName: lastName
          });
          this.loading = false;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    grammarBro,
    splitTasks,
    isTaskUnique,
    handleInvalid() {
      alert("You cannot submit an empty task");
    },
    submitTask(addition) {
      console.log("SUBMIT");
      if (this.newTask.lenth === 0) {
        alert("Please type a task");
      }
      this.newTask = "";
      this.taskSteps = "";
      if (isTaskUnique(addition, store.state.tasks)) {
        setTimeout(() => (this.addToggle = false), 200);
        setTimeout(
          () =>
            store.dispatch({
              type: type.Add,
              addedTask: addition
            }),
          200
        );
      } else {
        alert("You cannot add a task that already exists");
      }
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
  margin-top: 20px;
}

.AddButton {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  font-size: 30px;
  display: table-cell;
}

.AddButton:focus {
  outline: 0;
}

.Form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.Input {
  height: 20px;
  width: 90%;
  margin-bottom: 10px;
  align-self: center;
}

.TaskSubmit {
  width: 100px;
  align-self: center;
  background-color: darkgray;
  box-shadow: 1mm 1mm 1mm darkgray;
}
</style>
