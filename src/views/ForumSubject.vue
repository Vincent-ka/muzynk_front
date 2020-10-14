<template>
  <main class="main-topic">
    <ProfilDisplay />
    <Subject />
    <Navigation />
  </main>
</template>

<script>
import ProfilDisplay from './../components/ProfilDisplay'
import Subject from './../components/forum/Subject'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        ProfilDisplay,
        Subject,
        Navigation
    }
}
</script>

<style scoped>
.main-topic {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>