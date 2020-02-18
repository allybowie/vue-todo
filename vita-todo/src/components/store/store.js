import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [{ task: "First task", subtasks: [], complete: false }]
  },
  actions: {
    add(context, payload) {
      context.commit("add", payload);
    }
  },
  mutations: {
    add(state, payload) {
      state.tasks = [...state.tasks, payload.addedTask];
    }
  }
});

export default store;
