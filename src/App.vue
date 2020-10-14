<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>

import Header from './views/Header';
import Footer from './views/Footer';
import auth from "@/auth";

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    const currentUser = this.$store.getters["user/current"];
    const token = auth.getLocalAuthToken();

    if (token && !currentUser) {
      this.$store.dispatch("user/getUserByToken");
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
  font-family: 'Open Sans', sans-serif;
}

.btn:hover {
  background: #7D928D;
}
</style>
