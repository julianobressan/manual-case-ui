<template>
  <div>
    <NavBar />
    <router-view id="content"/>
  </div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}

</script>

<style lang="scss">
@import "@/style/variables.scss";

* {
  margin: 0;
}

.swal2-title {
  font-family: $fontFamily;
}

h2, h3 {
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
}

#app {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color1;
}

.title {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;

    .button-pane {
    text-align: right;
}
}

#content {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.action-button {
    font-family: $fontFamily;
    text-align: left;
    font-weight: 500;
    font-size: .9rem;
    letter-spacing: 2px;
    background-color: rgb(255, 141, 125);
    padding: 10px 20px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    text-decoration: none;
    color: #0B3B3C;
    transition: .3s;

    &:hover {
        background-color: rgb(243, 157, 145);
    }
}

</style>
