<template>
  <main class="main-dashboard">
      <Dashboard />
      <Navigation />
  </main>
</template>

<script>
import Navigation from './../components/nav/Navigation';
import Dashboard from './../components/dashboard/Dashboard'
export default {
    components: {
        Dashboard,
        Navigation
    }
}
</script>

<style scoped>
.main-dashboard {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>