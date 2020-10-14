<template>
  <header class="header">
    <Logo />
    <Title />
    <Burger />
  </header>
</template>

<script>
import Logo from "./../components/header/Logo";
import Title from "./../components/header/Title";
import Burger from "./../components/header/Burger";
export default {
  components: {
    Logo,
    Title,
    Burger
  }
};
</script>

<style scoped>
.header {
  height: 10vh;
  background: #7d928d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}


</style>