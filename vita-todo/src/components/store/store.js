import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
import firebase from "firebase/app";
const { flipMainTaskComplete, flipSubtaskComplete } = require("../utils/utils");

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    firstName: "",
    lastName: ""
  },
  actions: {
    add(context, payload) {
      context.commit("add", payload);
    },
    update(context, payload) {
      context.commit("update", payload);
    },
    toggleTaskComplete(context, payload) {
      context.commit("toggleTaskComplete", payload.editedTask);
    },
    toggleSubtaskComplete(context, payload) {
      context.commit("toggleSubtaskComplete", payload);
    },
    increment(context, payload) {
      context.commit("increment", payload);
    },
    delete(context, payload) {
      context.commit("delete", payload);
    },
    setTasks(context, payload) {
      context.commit("setTasks", payload);
    }
  },
  mutations: {
    add(state, payload) {
      console.log("ADD MUTATION");
      const userID = firebase.auth().currentUser.uid;
      const newData = {
        firstName: state.firstName,
        surName: state.lastName,
        tasks: [...state.tasks, payload.addedTask]
      };

      db.collection("UserCollection")
        .doc(userID)
        .set(newData);
      state.tasks = [...state.tasks, payload.addedTask];
    },
    delete(state, payload) {
      const userID = firebase.auth().currentUser.uid;

      const newData = {
        firstName: state.firstName,
        surName: state.lastName,
        tasks: [...payload.newTasks]
      };

      console.log("DELETE DATA", state);

      db.collection("UserCollection")
        .doc(userID)
        .set(newData);

      state.tasks = [...payload.newTasks];
    },
    update(state, payload) {
      const userID = firebase.auth().currentUser.uid;

      const newData = {
        firstName: state.firstName,
        surName: state.lastName,
        tasks: [...payload.updatedTasks]
      };

      db.collection("UserCollection")
        .doc(userID)
        .set(newData);

      state.tasks = payload.updatedTasks;
    },
    toggleTaskComplete(state, payload) {
      const userID = firebase.auth().currentUser.uid;

      const updates = state.tasks.map(task => {
        if (task === payload) {
          return flipMainTaskComplete(task);
        }
        return task;
      });

      const newData = {
        firstName: state.firstName,
        surName: state.lastName,
        tasks: [...updates]
      };

      db.collection("UserCollection")
        .doc(userID)
        .set(newData);

      state.tasks = updates;
    },
    setTasks(state, payload) {
      console.log("SET INFO", payload);
      state.tasks = [...payload.userTasks];
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
    toggleSubtaskComplete(state, payload) {
      const userID = firebase.auth().currentUser.uid;

      const updatedTask = flipSubtaskComplete(
        payload.mainTask,
        payload.editedTask.name
      );

      const finalUpdates = state.tasks.map(task => {
        if (task.task === payload.mainTask) {
          return updatedTask;
        }
        return task;
      });

      const newData = {
        firstName: state.firstName,
        surName: state.lastName,
        tasks: [...finalUpdates]
      };

      db.collection("UserCollection")
        .doc(userID)
        .set(newData);

      state.tasks = [...finalUpdates];
    }
  }
});

export default store;
