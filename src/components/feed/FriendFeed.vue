<template>
  <section class="sectionFriendFeed">
    <div class="friendInfos">
      <figure>
        <img
          class="displayImgFriend"
          :src="this.avatar"
          alt="avatar de l'utilisateur connecté"
        />
      </figure>
      <p>{{ this.prenom }} {{ this.nom }}</p>
    </div>
    <article>
      <div class="feedFriendBox">
        <p class="emptyFeedFriend" v-if="this.id_postsFeed.length === 0">
          Votre ami n'a encore rien posté dans son fil d'actualité.
        </p>
        <p
          class="post"
          v-for="(post, index) in id_postsFeed.slice().reverse()"
          :key="index"
        >
          {{ post.content }}
          <span
            class="delete-postFeedFriend"
            @click="deletePost(post._id)"
            v-if="currentUser.role === 'admin'"
            >x</span
          >
        </p>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id_postsFeed: [],
      fil: "",
      prenom: "",
      nom: "",
      avatar: ""
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
    // Function to get the friend
    async getFriend() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.fil = apiRes.data.fil;
      this.prenom = apiRes.data.firstname;
      this.nom = apiRes.data.lastname;
      this.avatar = apiRes.data.avatar;
      this.getFeedFriend();
    },
    // Function to get the friend's feed
    async getFeedFriend() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/feeds/" + this.fil
      );
      this.id_postsFeed = apiRes.data.id_postsFeed;
    },
    // Delete the post of the user
    async deletePost(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer le post ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/postsFeed/" + id
        );
        this.getFeedFriend();
      }
    }
  },
  created() {
    try {
      this.getFriend();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFriendFeed {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .friendInfos {
    display: none;
  }
}
@media screen and (min-width: 980px) {
  .sectionFriendFeed {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .friendInfos {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .friendInfos > p {
    font-weight: bold;
    font-size: 25px;
  }
}
.sectionFriendFeed > article {
  width: 90%;
  height: 90%;
  position: relative;
}
.feedFriendBox {
  background: red;
  width: 100%;
  height: 100%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}
.emptyFeedFriend {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
}
.friendInfos > figure {
  margin-top: 30%;
  margin-left: 10px;
  text-align: center;
}
.displayImgFriend {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}
.post {
  border-bottom: 1px solid;
  width: 100%;
  background: #b1c1c0;
  padding: 20px;
}
.delete-postFeedFriend {
  float: right;
  cursor: pointer;
}
</style>