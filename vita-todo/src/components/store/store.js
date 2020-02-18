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
    tasks: [{ task: "First task", subtasks: [], complete: false }]
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
    }
  },
  mutations: {
    add(state, payload) {
      state.tasks = [...state.tasks, payload.addedTask];
    },
    toggleTaskComplete(state, payload) {
      const updates = state.tasks.map(task => {
        if (task.task === payload.task) {
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
      console.log("UPDATES", updatedTask);

      const finalUpdates = state.tasks.map(task => {
        if (task.task === payload.mainTask) {
          return updatedTask;
        }
        return task;
      });
      console.log("FINAL UPDATES", finalUpdates);
      state.tasks = [...finalUpdates];
    }
  }
});

export default store;
