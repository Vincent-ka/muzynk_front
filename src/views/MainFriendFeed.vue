<template>
  <main class="main-feedFriend">
      <FriendFeed />
      <Navigation />
  </main>
</template>

<script>
import FriendFeed from './../components/feed/FriendFeed'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        FriendFeed,
        Navigation
    },
};
</script>

<style scoped>
.main-feedFriend {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>