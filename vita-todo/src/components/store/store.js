import Vue from "vue";
import Vuex from "vuex";
const {
  // splitTasks,
  // grammarBro,
  flipMainTaskComplete,
  flipSubtaskComplete
} = require("../utils/utils");

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    count: 0
  },
  actions: {
    add(context, payload) {
      context.commit("add", payload);
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
    }
  },
  mutations: {
    add(state, payload) {
      state.tasks = [...state.tasks, payload.addedTask];
    },
    delete(state, payload) {
      console.log("in mutation", payload);
      state.tasks = [...payload.newTasks];
    },
    increment(state) {
      state.count++;
    },
    toggleTaskComplete(state, payload) {
      const updates = state.tasks.map(task => {
        if (task === payload) {
          return flipMainTaskComplete(task);
        }
        return task;
      });
      state.tasks = updates;
    },
    toggleSubtaskComplete(state, payload) {
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
      state.tasks = [...finalUpdates];
    }
  }
});

export default store;
