<template>
  <section class="sectionProfil">
    <article>
      <form action="#" class="form-profil" @submit.prevent="patchUser">
        <h3>Bonjour {{this.currentUser.firstname}}. Voulez vous mettre votre profil à jour ?</h3>
        <label for="input-firstname" class="is-clickable">Prénom</label>
        <input
          id="input-firstname"
          type="text"
          class="input"
          name="firstname"
          value
          v-model="firstname"
        />

        <label for="input-lastname" class="is-clickable">Nom de famille</label>
        <input id="input-lastname" type="text" class="input" name="lastname" v-model="lastname" />

        <label for="input-email" class="is-clickable">Email</label>
        <input id="input-email" type="email" class="input" name="email" v-model="email" />

        <label for="input-avatar" class="is-clickable">Avatar</label>
        <input
          id="input-avatar"
          type="file"
          class="input-file"
          name="avatar"
          @change="handleAvatar"
          accept="image/*"
        />
        <button class="btn">ok</button>
      </form>
    </article>

    <article>
      <form action="#" class="form-profil" @submit.prevent="patchPassword">
        <h3>Mettre a jour votre mot de passe</h3>

        <label for="input-newpassword" class="is-clickable">Nouveau mot de passe</label>
        <input
          id="input-newpassword"
          type="password"
          class="input"
          name="password"
          autocomplete="on"
          v-model="password"
        />
        <button class="btn">ok</button>
      </form>
    </article>

    <article class="manage">
      <button class="manage-profil" @click="signout">Déconnexion</button>
      <p class="manage-profil" @click="deleteUser">Effacer son profil</p>
    </article>

      <router-link class="link-legalMentions" to="/legalMentions"><p class="mentionLegal">Mentions légales</p></router-link>
  </section>
</template>

<script>
import axios from "axios";
import auth from "@/auth/";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      tmpURL: null
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
    // Function to get the connected user
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.firstname = apiRes.data.firstname;
      this.lastname = apiRes.data.lastname;
      this.email = apiRes.data.email;
    },
    // Function to edit the connected user's informations
    async patchUser() {
      const { firstname, lastname, email } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id,
          {
            firstname,
            lastname,
            email
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      alert("Les informations ont bien été changées");
    },
    // Function to edit the connected user's password
    async patchPassword() {
      const { password } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL +
            "/users/password/" +
            this.currentUser._id,
          {
            password
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      alert("Le mot de passe bien été changées");
    },
    // Function to edit the connected user's avatar
    handleAvatar(e) {
      const fileObject = e.target.files[0];
      this.tmpURL = URL.createObjectURL(fileObject);

      const fd = new FormData();
      fd.append("avatar", fileObject);
      this.$store.dispatch("user/updateAvatar", fd);
    },
    // Allow to the avatar to update without refreshing the page
    refreshAvatar() {
      this.$ebus.$emit("refresh-avatar")
    },
    // Function to delete the connected user
    async deleteUser() {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre compte ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
        );
        this.signout();
      }
    },
    //Function to signout
    signout() {
      auth.signout(this);
      this.$router.push("/");
    }
  },
  created() {
    try {
      this.getUser();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionProfil {
    overflow-y: auto;
    height: 100%;
    width: 100%;
  }

  .sectionProfil > article {
    display: flex;
    justify-content: center;
  }

  article.manage {
    display: flex;
    justify-content: space-around;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  .form-profil:first-of-type {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .mentionLegal {
    display: block;
    padding: 10px;
    text-align: center;
  }

  .link-legalMentions {
  color: black;
  text-decoration: none;
}
}

@media screen and (min-width: 980px) {
  .sectionProfil {
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 100%;
  }

  .sectionProfil > article {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article.manage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
  }

  .mentionLegal {
    display: none;
  }
}

.form-profil {
  display: flex;
  flex-direction: column;
  max-width: 320px;
  padding: 20px;
  border: 2px solid #4f7f88;
  border-radius: 10px;
  background: #7d928d;
  max-width: 300px;
}

.form-profil .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-profil .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-profil .input:last-of-type {
  margin-bottom: 20px;
}

.form-profil .input,
.form-profil .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-profil .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}
.manage-profil {
  border: 1px solid;
  border-radius: 0.3rem;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  background: #efefef;
  cursor: pointer;
}
.manage-profil:hover {
  background: #7d928d;
}
form > h3 {
  margin-bottom: 10px;
}
.input-file {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>