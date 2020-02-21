<template>
  <div>
    <button @click="logout">Sign Out</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "SignOut",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
