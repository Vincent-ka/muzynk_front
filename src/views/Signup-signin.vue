<template>
  <main class="main-log">
    <h1 class="mainTitle">Bienvenue sur Muzynk</h1>
    <p class="presentation-media">
      Vous êtes passionné de musique et souhaitez échanger avec des personnes
      ayant le même intérêt ? Vous ête au bon endroit.
    </p>
    <section class="sectionLog">
      <article class="formPres">
        <form class="form-log" v-on:submit.prevent="signin">
          <h3>Connectez-vous</h3>

          <label for="input-email-log" class="is-clickable">Email</label>
          <input
            id="input-email-log"
            type="email"
            class="input"
            name="email"
            autocomplete="email"
            v-model="connexion.email"
            required
          />

          <label for="input-password-log" class="is-clickable"
            >Mot de passe</label
          >
          <input
            id="input-password-log"
            type="password"
            class="input"
            name="password"
            autocomplete="current-password"
            required
            v-model="connexion.password"
          />
          <button class="btn">ok</button>
        </form>
      </article>

      <article class="presentation">
        <p>Muzynk est un réseau social destiné aux passionnés de musique.</p>
        <p>
          Essayez son forum afin de pouvoir échanger et rencontrer des personnes
          partageant vos goût musicaux. Son fil d'actualité vous permettra de
          vous exprimer et n'hésitez pas à discuter avec les autres utlisateurs
          via le chat.
        </p>
      </article>

      <article class="formPres">
        <form class="form-log" @submit.prevent="signup">
          <h3>Inscrivez vous</h3>

          <label for="input-firstname" class="is-clickable">Prénom</label>
          <input
            id="input-firstname"
            type="text"
            class="input"
            name="firstname"
            autocomplete="given-name"
            v-model="user.firstname"
            required
          />

          <label for="input-lastname" class="is-clickable"
            >Nom de famille</label
          >
          <input
            id="input-lastname"
            type="text"
            class="input"
            name="lastname"
            autocomplete="family-name"
            v-model="user.lastname"
            required
          />

          <label for="input-email-sign" class="is-clickable">Email</label>
          <input
            id="input-email-sign"
            type="email"
            class="input"
            name="email"
            autocomplete="email"
            v-model="user.email"
            required
          />

          <label for="input-password-sign" class="is-clickable"
            >Mot de passe</label
          >
          <input
            id="input-password-sign"
            type="password"
            class="input"
            name="password"
            autocomplete="current-password"
            v-model="user.password"
            required
          />

          <button class="btn">ok</button>
        </form>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      connexion: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // updateAvatar(image) {
    //   console.log(image);
    // },
    // Function to signup
    signup() {
      const fd = new FormData(); // form data nécessaire pour envoyer des fichiers images (files)
      fd.append("firstname", this.user.firstname);
      fd.append("lastname", this.user.lastname);
      fd.append("email", this.user.email);
      fd.append("password", this.user.password);
      if (this.user.avatar) fd.append("avatar", this.user.avatar);
      this.$store.dispatch("user/signup", fd);
      this.user.firstname = "";
      this.user.lastname = "";
      this.user.email = "";
      this.user.password = "";
    },
    // Function to signin
    signin() {
      this.$store
        .dispatch("user/signin", {
          email: this.connexion.email,
          password: this.connexion.password
        })
        .then(() => {
          this.$router.push("/profil");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .main-log {
    overflow-y: auto;
  }

  .sectionLog > article {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  article.presentation {
    display: none;
  }

  .form-log:first-of-type {
    margin-bottom: 40px;
  }

  .presentation-media {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 500;
    line-height: 30px;
  }

  .mainTitle {
    text-align: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionLog {
    display: flex;
    justify-content: space-around;
  }

  .sectionLog > article.presentation {
    align-self: center;
    width: 30%;
    padding: 20px;
    border: 2px solid #4f7f88;
    border-radius: 10px;
  }

  .sectionLog > article.formPres {
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .presentation {
    text-align: justify;
    font-weight: 500;
    line-height: 30px;
  }

  .presentation-media {
    display: none;
  }

  .mainTitle {
    display: none;
  }
}

.main-log {
  height: 84vh;
  background: #426859;
}

.sectionLog {
  width: 100%;
  height: 100%;
}

.form-log {
  display: flex;
  flex-direction: column;
  max-width: 320px;
  padding: 20px;
  border: 2px solid #4f7f88;
  border-radius: 10px;
  background: #7d928d;
}

.form-log .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-log .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-log .input:last-of-type {
  margin-bottom: 20px;
}

.form-log .input,
.form-log .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-log .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}
</style>