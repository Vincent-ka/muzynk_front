<template>
  <section class="sectionDashboard">
    <article>
      <table class="table-user">
        <thead>
          <tr class="table-user-row">
            <th class="table-user-head">Nom</th>
            <th class="table-user-head">Nom de famille</th>
            <th class="table-user-head">Email</th>
            <th class="table-user-head">Role</th>
            <th class="empty"></th>
            <th class="empty"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="i" class="table-user-row">
            <th class="head-user-responsive">Nom</th>
            <td><router-link :to="'/friend-feed/' + user._id" class="lien-dashboard-feed">{{user.firstname}}</router-link></td>
            <th class="head-user-responsive">Nom de famille</th>
            <td>{{user.lastname}}</td>
            <th class="head-user-responsive">Email</th>
            <td>{{user.email}}</td>
            <th class="head-user-responsive">Role</th>
            <td>{{user.role}}</td>
            <td>
              <router-link :to="'/dashboard/edit/' + user._id" class="link-edit">
              <p>Edit</p>
              </router-link>
            </td>
            <td class="last-user-td is-clickable supp" @click="deleteUser(user._id)">Supprimer</td>
            <div v-for="(ami, i) in users.friendlist" :key="i">
              <td>{{ami[1]}}</td>
            </div>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    // Function to display all of the users
    async getUsers() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users"
      );
      this.users = apiRes.data;
    },
    // Function to delete a user
    async deleteUser(id) {
      if (confirm("Voulez vous bien supprimer cet utilisateur ?")) {
      const apiRes = await axios.delete(
        process.env.VUE_APP_BACKEND_URL + "/users/" + id
      );
      this.users = apiRes.data;
      this.getUsers()
      }
    }
  },
  created() {
    try {
      this.getUsers();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionDashboard {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }
  td, th {
    background: #B1C1C0;
  }
  .table-user-row {
    display: flex;
    flex-direction: column;
  }
  .table-user-head {
    display: none;
  }
  .last-user-td {
    margin-bottom: 50px;
  }
  .table-user {
    width: 100%;
  }
  .empty {
    display: none;
  }
  .head--user-responsive {
    display: block;
  }
}

@media screen and (min-width: 980px) {
  .sectionDashboard {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }

  .table-user {
    border: 2px solid #4f7f88;
    border-collapse: collapse;
    width: 100%;
    background: #B1C1C0;
  }
  .head-user-responsive {
    display: none;
  }
}

.link-edit {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.link-edit:hover {
  text-decoration: underline;
}

.sectionDashboard > article {
  width: 90%;
  height: 90%;
}

.table-user th {
  border: 1px solid;
  padding: 5px;
  text-align: center;
}

.table-user td {
  border: 1px solid;
  padding: 5px;
  text-align: center;
}

.supp {
  cursor: pointer;
  font-weight: bold;
}

.supp:hover {
  text-decoration: underline;
}
.lien-dashboard-feed {
  color: black;
  text-decoration: none;
}
</style>