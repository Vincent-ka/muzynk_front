<template>
  <main class="main-feed">
    <ProfilDisplay />
    <Feed />
    <Navigation />
  </main>
</template>

<script>
import ProfilDisplay from "./../components/ProfilDisplay";
import Feed from "./../components/feed/Feed";
import Navigation from "./../components/nav/Navigation";
export default {
  components: {
    ProfilDisplay,
    Feed,
    Navigation
  }
};
</script>

<style scoped>
.main-feed {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>