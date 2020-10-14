<template>
  <main class="main-friendList">
      <FriendList />
      <Navigation />
  </main>
</template>

<script>
import FriendList from './../components/feed/FriendList'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        FriendList,
        Navigation
    }
};
</script>

<style scoped>
.main-friendList {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>