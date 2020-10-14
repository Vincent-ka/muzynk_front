<template>
  <main class="main-legalMentions">
      <cgu />
  </main>
</template>

<script>
import cgu from './../components/footer/CGU'


export default {
  components: {
    cgu
  }
}
</script>

<style scoped>
.main-legalMentions {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>