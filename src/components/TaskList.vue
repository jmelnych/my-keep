<template>
    <div class="content-layout">
        <side-navigation
                v-on:filter-tasks="filterTasks"
        ></side-navigation>
        <ul class="task-list">
          <task-item class="item"
                     v-for="task in tasks"
                     v-bind:task="task"
                     v-bind:key="task.id"
                     v-on:remove-task="removeTask"
                     v-on:complete-task="completeTask"
                     v-on:archive-task="archiveTask"
                     v-bind:class="[task.completed ? 'task-item-completed' : '',
                     task.archived ? 'task-item-archived' : '']"
          >
          </task-item>
        </ul>
    </div>
</template>

<script>

import axios from 'axios';
import TaskItem from './TaskItem.vue';
import SideNavigation from './SideNavigation.vue';
import BASEURL from '../api';

export default {
  components: { TaskItem, SideNavigation },
  name: 'task-list',
  props: {
    newTask: Object,
  },
  data() {
    return {
      tasks: [],
      query: 'all',
    };
  },
  mounted() {
    this.$root.$on('addTaskEvent', taskObj => this.tasks.push(taskObj));
    axios
      .get(`${BASEURL}/tasks`)
      .then((res) => {
        this.tasks = res.data;
        this.taskArchived = res.data.filter(task => task.archived);
      });
  },
  methods: {
    filterTasks(query) {
      this.query = query;
      this.tasks = query === 'all' ? this.tasks : this.tasks.filter(task => task.archived);
    },
    removeTask(id) {
      axios
        .delete(`${BASEURL}/tasks/${id}`)
        .then(() => this.tasks = this.tasks.filter(task => task.id !== id));
    },
    completeTask(id) {
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
    archiveTask(id) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        return;
      }
      taskToUpdate.archived = !taskToUpdate.archived;
      axios
        .put(`${BASEURL}/tasks/${id}`, taskToUpdate)
        .then((res) => {
          this.tasks = this.tasks.map(task => (task.id === id ? res.data : task)).filter(task => !task.archived);
        });
    },
  },
};
</script>

<style lang="scss">

    .content-layout {
        display: flex;
    }

    .task-list {
      display: flex;
      flex-wrap: wrap;
    }
</style>
