<template>
  <router-link class="link-legalMentions" to="/legalMentions"
    ><p class="mentionLegal">Mentions légales</p></router-link
  >
</template>

<script>
export default {};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .mentionLegal {
    display: none;
  }
}
.mentionLegal {
  margin-right: 5px;
}

.link-legalMentions {
  color: black;
  text-decoration: none;
}
</style>