<template>
        <ul class="task-list">
          <task-item class="item"
                     v-for="task in tasks"
                     v-bind:task="task"
                     v-bind:key="task.id"
                     v-on:remove-task="removeTask"
                     v-on:mark-complete="markComplete"
                     v-bind:class="[task.completed ? 'task-item-completed' : '']"
          >
          </task-item>
        </ul>
</template>

<script>

import axios from 'axios';
import TaskItem from './TaskItem.vue';
import BASEURL from '../api';

export default {
  components: { TaskItem },
  name: 'task-list',
  props: {
    newTask: Object,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.$root.$on('addTaskEvent', taskObj => this.tasks.push(taskObj));
    axios
      .get(`${BASEURL}/tasks`)
      .then(res => this.tasks = res.data);
  },
  methods: {
    removeTask(id) {
      axios
        .delete(`${BASEURL}/tasks/${id}`)
        .then(() => this.tasks = this.tasks.filter(task => task.id !== id));
    },
    markComplete(id) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        return;
      }
      taskToUpdate.completed = !taskToUpdate.completed;
      axios
        .put(`${BASEURL}/tasks/${id}`, taskToUpdate)
        .then((res) => {
          this.tasks = this.tasks.map(task => (task.id === id ? res.data : task));
        });
    },
    archiveTask() {

    },
  },
};
</script>

<style lang="scss">
    .task-list {
      display: flex;
      flex-wrap: wrap;
    }
</style>
