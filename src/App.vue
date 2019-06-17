<template>
  <div id="app">
    <text-box/>
    <task-list/>
  </div>
</template>

<script>
import TextBox from './components/TextBox.vue';
import TaskList from './components/TaskList.vue';


export default {
  name: 'app',
  components: {
    TextBox,
    TaskList,
  },
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
  }
</style>
