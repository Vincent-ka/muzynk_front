<template>
  <section class="sectionFriendList">
    <h1>Liste des amis</h1>
    <article>
      <p class="instruction">Cliquez sur le nom d'un ami afin de voir son fil d'actualité</p>
      <p v-if="this.friendsId == '' ">Vous n'avez pas d'amis</p>
      <ul class="friendList">
        <li v-for="(friend, index) in friendsNoms" :key="index">
          <router-link :to="'/friend-feed/' + friend.id" class="link-friend">{{friend.firstname}} {{friend.lastname}}</router-link>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      friendsId: "",
      friendsNoms: [{ firstname: "", lastname: "", id: "" }]
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
    // Function to get the IDs of the friendlist
    async getFriends() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.friendsId = apiRes.data.friendlist;
      console.log("les amis id", this.friendsId);
      this.getFriendsName();
    },
    // Function to get the names from the friendlist
    async getFriendsName() {
      for (let i = 0; i < this.friendsId.length; i++) {
        const apiRes = await axios.get(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.friendsId[i]
        );
        this.friendsNoms.push({
          firstname: apiRes.data.firstname,
          lastname: apiRes.data.lastname,
          id: apiRes.data._id
        });
      }
    }
  },
  created() {
    try {
      this.getFriends();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFriendList {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sectionFriendList > article {
    height: 90%;
    width: 80%;
    border: 1px solid black;
    padding: 20px;
    background: #b1c1c0;
    border-radius: 10px;
    overflow-y: auto;
  }
}
@media screen and (min-width: 980px) {
  .sectionFriendList {
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
  .sectionFriendList > article {
    height: 90%;
    width: 90%;
    border: 1px solid black;
    padding: 20px;
    background: #b1c1c0;
    border-radius: 10px;
  }
}

.friendList {
  list-style: none;
}
.friendList > li {
  margin-bottom: 15px;
}

.link-friend {
  text-decoration: none;
  color: black;
  font-size: 20px;
}
.instruction {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
</style>