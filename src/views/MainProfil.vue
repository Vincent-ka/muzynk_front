<template>
  <main class="main-profil">
      <Profil />
      <Navigation />
  </main>
</template>

<script>
import Profil from './../components/profil/Profil';
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        Profil,
        Navigation
    }
};
</script>

<style scoped>
.main-profil {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>