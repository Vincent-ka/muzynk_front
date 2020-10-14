<template>
  <div class="main-chat">
      <Chat />
      <Navigation />
  </div>
</template>

<script>
import Chat from "./../components/chat/Chat";
import Navigation from "./../components/nav/Navigation"
export default {
    components: {
        Chat,
        Navigation
    }
};
</script>

<style scoped>
.main-chat {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>