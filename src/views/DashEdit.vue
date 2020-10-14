<template>
    <main class="main-dashedit">
        <editUser />
        <Navigation />
    </main>
</template>

<script>
import Navigation from "./../components/nav/Navigation";
import editUser from "./../components/dashboard/editUser"
export default {
    components: {
        editUser,
        Navigation
    }
};
</script>

<style scoped>
.main-dashedit {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>