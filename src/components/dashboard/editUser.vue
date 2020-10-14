<template>
  <section class="sectionDashEdit">
    <article>
      <form action="#" class="form-dashEdit" @submit.prevent="patchUser">
        <h3 class="title-dash-edit">Mettre à jour le profil</h3>
        <label for="admin" class="label">
          <input
            type="radio"
            id="admin"
            value="admin"
            class="radio"
            v-model="role"
          />Admin
        </label>
        <label for="moderator" class="label">
          <input
            type="radio"
            id="moderator"
            value="moderator"
            class="radio"
            v-model="role"
          />Moderator
        </label>
        <label for="user" class="label">
          <input
            type="radio"
            id="user"
            value="user"
            class="radio"
            v-model="role"
          />User
        </label>
        <button class="btn">ok</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      role: ""
    };
  },
  methods: {
    // Function to display the informations of the user 
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.role = apiRes.data.role;
    },
    // Function to edit the informations of the users
    async patchUser() {
      const { role } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id,
          {
            role
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      this.$router.push("/dashboard");
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
  .sectionDashEdit {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

}
@media screen and (min-width: 980px) {
  .sectionDashEdit {
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
}

.form-dashEdit {
  display: flex;
  flex-direction: column;
  max-width: 320px;
  padding: 20px;
  border: 2px solid #4f7f88;
  border-radius: 10px;
  background: #7d928d;
  max-width: 300px;
}
.form-dashEdit .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-dashEdit .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}
.label {
  margin-bottom: 15px;
}
.radio {
  margin-right: 10px;
}
.title-dash-edit {
  margin-bottom: 10px;
}
</style>