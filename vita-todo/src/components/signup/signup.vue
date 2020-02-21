<template>
  <div class="sign-up">
    <h3>Sign up to stay organised!</h3>
    <input
      v-model="firstName"
      type="text"
      class="input"
      placeholder="First Name"
      required
    />
    <br />
    <input
      v-model="lastName"
      type="text"
      class="input"
      placeholder="Last Name"
      required
    />
    <br />
    <input
      v-model="email"
      type="text"
      class="input"
      placeholder="Email"
      required
    />
    <br />
    <input
      v-model="password"
      type="password"
      class="input"
      placeholder="Password"
      required
    />
    <br />
    <button v-on:click="signUp" class="button">Sign Up!</button>
    <button class="button">
      <router-link to="/login">
        Sign in
      </router-link>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          const newUser = {
            firstName: this.firstName,
            surName: this.lastName,
            tasks: []
          };
          db.collection("UserCollection")
            .doc(user.uid)
            .set(newUser);
          alert("Account created!");
          this.$router.replace("/login");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>
