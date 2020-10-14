<template>
  <footer class="footer">
    <SocialLinks />
    <LegalMention />
  </footer>
</template>

<script>
import SocialLinks from "./../components/footer/SocialLinks";
import LegalMention from "./../components/footer/LegalMention";
export default {
  components: {
    SocialLinks,
    LegalMention
  }
};
</script>

<style scoped>
.footer {
  height: 6vh;
  background: #7d928d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
</style>