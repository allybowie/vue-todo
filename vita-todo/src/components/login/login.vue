<template>
  <div class="login">
    <input
      type="text"
      v-model="email"
      placeholder="Email address"
      class="input"
      required
    />
    <br />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      class="input"
      required
    />
    <br />
    <button v-on:click="login" class="button">Enter</button>
    <p>
      <router-link to="/signup">
        Create a new account
      </router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/list");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>
