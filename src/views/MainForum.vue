<template>
  <main class="main-forum">
    <ProfilDisplay />
    <Forum />
    <Navigation />
  </main>
</template>

<script>
import ProfilDisplay from './../components/ProfilDisplay'
import Forum from './../components/forum/Forum'
import Navigation from './../components/nav/Navigation'
export default {
  components: {
    ProfilDisplay,
    Forum,
    Navigation
  }
}
</script>

<style scoped>
.main-forum {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>