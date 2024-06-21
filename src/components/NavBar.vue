<template>
    <div id="nav">
        <img alt="Vue logo" src="@/assets/manual-horizontal-logo-white.svg">
        <div>
            <router-link to="/">Start Now</router-link>
            <router-link to="/management">Manage Questionnaire</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped lang="scss">
#nav {
    background-color: #0b3b3c;
    text-align: center;
    
    padding: 2rem;

    img {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    a {
        margin: 1rem;
        color: #FFF;
        text-transform: uppercase;
        letter-spacing: 3px;
        text-decoration: none;
        transition: .3s;

        &:hover {
            color: rgb(255, 141, 125);
        }
    }
}
</style>