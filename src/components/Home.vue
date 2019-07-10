<template>
  <div>
    <text-box/>
    <task-list/>
  </div>
</template>

<script>
import TextBox from './TextBox.vue';
import TaskList from './TaskList.vue';


export default {
  name: 'home',
  components: {
    TextBox,
    TaskList,
  },
};
</script>
