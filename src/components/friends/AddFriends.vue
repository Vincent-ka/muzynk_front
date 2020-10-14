<template>
  <section class="sectionAddFriends">
    <article>
      <p class="request">Voulez vous ajouter {{this.firstname}} {{this.lastname}} en amis ?</p>
      <div>
      <button @click="addFriend" class="btn">oui</button>
      <button class="btn">
        <router-link :to="'/forum'" class="link">non</router-link>
      </button>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      idFriend: "",
      friendlist: []
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
    // Function to get the user we want to add as a friend
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.firstname = apiRes.data.firstname;
      this.lastname = apiRes.data.lastname;
      this.idFriend = apiRes.data._id
    },
    // Function to get the current user's friendlist
    async getUserConnected() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.friendlist = apiRes.data.friendlist;
    },
    // Function to add the user in the friendlist
    async addFriend() {
      if (this.currentUser._id === this.idFriend) {
        alert("Vous ne pouvez pas vous ajouter en ami");
        this.$router.push("/forum")
      } else if (!this.friendlist.includes(this.idFriend)) {
      this.friendlist.push(this.$route.params.id);
      const { friendlist } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id,
          {
            friendlist
          }
        );
        console.log(apiRes);
        this.$router.push("/friend-feed/" + this.idFriend)
      } catch (apiErr) {
        console.error(apiErr);
      }
      } else {
        alert("Vous êtes déjà ami avec " + this.firstname + " " + this.lastname)
        this.$router.push("/forum")
      }
    }
  },
  created() {
    try {
      this.getUser();
      this.getUserConnected();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
    .sectionAddFriends {
    height: 100%;
    width: 100%;
  }

  .sectionAddFriends > article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
@media screen and (min-width: 980px) {
.sectionAddFriends {
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 100%;
}

.sectionAddFriends > article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.btn {
  border: 1px solid;
  border-radius: 0.3rem;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 80px;
  margin-bottom: 20px;
  margin-right: 15px;
}
.link {
  color: black;
  text-decoration: none;
}

.request {
    margin-bottom: 20px;
    font-size: 25px;
    text-align: center;
}
</style>