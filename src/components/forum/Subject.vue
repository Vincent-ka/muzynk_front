<template>
  <section class="sectionTopic">
    <article>
      <div class="topicBox">
        <div
          class="postTopicContent"
          v-for="(post, index) in id_postsForum"
          :key="index"
        >
          <div class="AuthorTopic">
            <router-link :to="'/add-friends/' + post.id_author">
              <figure class="author-photo">
                <img
                  class="postDisplayImg"
                  :src="post.avatar"
                  alt="avatar de l'utilisateur ayant posté le post"
                />
              </figure>
            </router-link>
            <router-link
              class="link-author"
              :to="'/add-friends/' + post.id_author"
              >{{ post.firstname }}</router-link
            >
          </div>
          <div class="MessageContent">
            <p>{{ post.content }}</p>
            <p class="date-delete">
              <span class="date-post-forum">{{
                moment(post.date_published).format("lll")
              }}</span>
              <span
                class="delete-post"
                @click="deleteMessage(post._id)"
                v-if="
                  currentUser._id === post.id_author ||
                    currentUser.role === 'admin' ||
                    currentUser.role === 'moderator'
                "
                >x</span
              >
            </p>
          </div>
        </div>
      </div>
      <form class="topicForm" @submit.prevent="postContent">
        <input
          class="topic-input"
          type="text"
          placeholder="Créer un post"
          v-model="content"
        />
        <button class="topic-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      id_postsForum: [],
      firstname: "",
      avatar: "",
      date_published: ""
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
    // Function to display the topic
    async getSubject() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/subjects/" + this.$route.params.id
      );
      this.id_postsForum = apiRes.data.id_postsForum;
    },
    // Function to post a new message
    async postContent() {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/postsForum/",
        {
          content: this.content,
          id_author: this.currentUser._id,
          firstname: this.currentUser.firstname,
          avatar: this.currentUser.avatar,
          date_published: Date.now()
        }
      );
      this.content = "";
      this.patchSubject(apiRes.data._id);
    },
    // Function to add the new post in the topic
    async patchSubject(id) {
      this.id_postsForum.push(id);
      const { id_postsForum } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL +
            "/subjects/" +
            this.$route.params.id,
          {
            id_postsForum
          }
        );
        console.log("resultat du patch", apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      this.getSubject();
    },
    // Function to delete a post
    async deleteMessage(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre message ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/postsForum/" + id
        );
        this.getSubject();
      }
    }
  },
  created() {
    try {
      this.getSubject();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionTopic {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .author-photo {
    margin: auto;
  }
  .postDisplayImg {
    width: 80%;
    border-radius: 50%;
  }
}

@media screen and (min-width: 980px) {
  .sectionTopic {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .author-photo {
    margin: auto;
  }
  .postDisplayImg {
    width: 40%;
    border-radius: 50%;
  }
}

.sectionTopic > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.topicBox {
  width: 100%;
  height: 95%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.topicForm {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 5%;
  width: 100%;
  background: gray;
  justify-content: center;
  border-top: none;
}

.topic-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.topic-input {
  width: 100%;
}

.postTopicContent {
  display: flex;
}

.AuthorTopic {
  width: 20%;
  background: #698880;
  text-align: center;
  padding: 10px;
  border-right: 1px solid black;
  font-size: 10px;
}

.link-author {
  text-decoration: none;
  color: black;
}

.link-author:hover {
  text-decoration: underline;
}

.MessageContent {
  width: 80%;
  background: #b1c1c0;
  padding: 10px;
  border-bottom: 1px solid black;
}
.delete-post {
  background: #b1c1c0;
  cursor: pointer;
  padding: 5px;
}
.date-post-forum {
  font-size: 10px;
}
.date-delete {
  float: right;
}
</style>