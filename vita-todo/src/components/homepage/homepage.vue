<template>
  <div>
    <SignOut />
    <TodaysDate />
    <Header />
    <TaskList />
  </div>
</template>

<script>
import Header from "../header/header";
import TodaysDate from "../date/date";
import TaskList from "../tasklist/tasklist";
import SignOut from "../signout/signout";

export default {
  name: "HomePage",
  components: { Header, TodaysDate, TaskList, SignOut }
};
</script>
