<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    max-width: 90%;
  }
  * {
    box-sizing: border-box;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .error {
    width: 100%;
    text-align: center;
    color: red;
  }
</style>
