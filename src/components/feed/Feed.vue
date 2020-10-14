<template>
  <section class="sectionFeed">
    <article>
      <div class="feedbox" >
        <p class="emptyFeed" v-if="this.id_postsFeed.length === 0">Votre fil d'actualité est vide. Essayez de poster votre premier message.</p>
        <p class="post" v-for="(post, index) in id_postsFeed.slice().reverse()" :key="index">
          {{post.content}} <span class="delete-postFeed" @click="deletePost(post._id)">x</span>
        </p>
      </div>
      <form class="feedform" @submit.prevent="postContent">
        <div>
          <input class="feed-input" type="text" placeholder="poster du contenu" v-model="post"/>
        </div>
        <button type="submit" class="feed-submit">Send</button>
        <router-link :to="'/friend-list/'" class="link-friendlist">
        <p>Feed ami</p>
        </router-link>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      post: "",
      id_postsFeed: [],
      fil: [],
    }
  },
  computed: {
    // Function to get the current user
    currentUser() {
      const userInfos = this.$store.getters["user/current"];// Get the current user from the store
      return userInfos; // Return the infotmations available under the name "currentUser"
    }
  },
  methods: {
     // Function to display the user's feed
    async getFeed() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/feeds/" + this.currentUser.fil
      );
      this.id_postsFeed = apiRes.data.id_postsFeed
    },
    // Function to check if the user has a feed
    async checkFeed() {
      this.fil = this.currentUser.fil
      if (this.fil.length === 0) {
        const apiRes = await axios.post(
          process.env.VUE_APP_BACKEND_URL + "/feeds/", {
            id_author: this.currentUser._id,
            id_postsFeed : []
          }
        );
        console.log("le post", apiRes.data._id)
        this.patchUser(apiRes.data._id)
        this.getFeed()
      } else {
        this.getFeed()
      }
    },
    // Function to add the created feed to the user
    async patchUser(id) {
      this.fil.push(id);
      const { fil } = this.$data
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id,
          {
            fil
          }
        );
        console.log("resultat du patch", apiRes);
      } catch (apiErr) {
        console.error(apiErr)
      }
    },
    // Function to post a new message 
    async postContent() {
      if (this.post.length != 0) {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/postsFeed/", {
          content: this.post,
          date_published: Date.now()
        }
      );
      this.post = ""
      this.patchFeed(apiRes.data._id)
      }
    },
    // Function to add the posted message to the feed
    async patchFeed(id) {
      this.id_postsFeed.push(id);
      const { id_postsFeed } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/feeds/" + this.currentUser.fil,
          {
            id_postsFeed
          }
        );
        console.log("resultat du patch", apiRes)
      } catch(apiErr) {
        console.error(apiErr)
      };
      this.getFeed()
    },
    // Function to delete the message
    async deletePost(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre post ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/postsFeed/" + id
        );
        this.getFeed()
      }
    },
  },
  created() {
    try {
      this.checkFeed()
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFeed {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (min-width: 320px) and (max-width: 350px) {
  .link-friendlist > p {
    font-size: 10px;
    padding: 5px;
  }
}
@media screen and (min-width: 980px) {
  .sectionFeed {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.sectionFeed > article {
  width: 90%;
  height: 90%;
  position: relative;
}
.feedbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}
.feedform {
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
.feed-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}
.feedform div {
  align-self: center;
}
.feed-input {
  margin-left: 10px
}
.feed-input-file {
  margin-left: 10px;
}
.post {
  border-bottom: 1px solid;
  width: 100%;
  background: #B1C1C0;
  padding: 20px;
}
.link-friendlist {
  text-decoration: none;
  color: black;
  border-left: 1px solid black;
  display: flex;
  align-items: center;
  background: #7D928D;
}
.delete-postFeed {
  float: right;
  cursor: pointer;
}
.emptyFeed {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
}
</style>