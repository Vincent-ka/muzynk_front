<template>
  <section class="sectionFriends">
    <article>
      <!-- <h2 class="chat-title">Chat</h2> -->
      <div class="chatbox">
        <p class="emptyChat" v-if="this.messages.length === 0">
          Bienvenue sur la chat du site. Cette chatroom est générale, tous les utilisateurs connectés peuvent voir les messages postés. Un chat privé sera mis en place dans quelques mois.
        </p>
        <p v-for="(msg, index) in messages" :key="index">
          <span class="sender">{{ msg.user }}</span>
          : {{ msg.message }}
        </p>
      </div>
      <form class="chatform" @submit.prevent="sendMessage">
        <div>
          <input
            class="chat-input"
            type="text"
            placeholder="Ecrire un message"
            v-model="message"
          />
        </div>
        <button type="submit" class="chat-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("localhost:3001")
    };
  },
  computed: {
    // Function to get the current user
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // Get the current user from the store
      return userInfos; // Return the infotmations available under the name "currentUser"
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
      this.message = "";
    },
    // Function to get the user's name
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.user = apiRes.data.firstname;
    },
    // Function to get the chat
    async getChat() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/chats/5f4cb5308e9be0103428fb2b"
      );
      this.messages = apiRes.data.message;
      console.log(apiRes.data.message);
    }
  },
  created() {
    try {
      this.getUser();
      this.getChat();
    } catch (err) {
      console.error(err);
    }
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFriends {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionFriends {
    width: 80%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sectionFriends > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.chatbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
  padding: 10px;
}

.chatbox p {
  margin-bottom: 20px;
}

.chatform {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 10%;
  width: 100%;
  background: gray;
  justify-content: center;
  border: 2px solid black;
  border-top: none;
}

.chat-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.chatform div {
  align-self: center;
}

.chat-input {
  margin-left: 10px;
}

.sender {
  text-decoration: underline;
}

.emptyChat {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
}
</style>
