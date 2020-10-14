<template>
  <main class="main-addFriends">
      <AddFriends />
      <Navigation />
  </main>
</template>

<script>
import AddFriends from "./../components/friends/AddFriends";
import Navigation from "./../components/nav/Navigation";
export default {
    components: {
        AddFriends,
        Navigation
    }
}
</script>

<style scoped>
.main-addFriends {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>