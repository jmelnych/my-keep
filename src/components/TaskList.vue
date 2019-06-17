<template>
    <div>
        <ul class="task-list">
        <li class="task-item" v-for="task in tasks" :key="task.id" v-bind:class="[task.completed ?
        'task-item-completed' : '']">
            <div class="task-item__header">
                <div class="task-item__title"> {{ task.title }} </div>
                <font-awesome-icon icon="check" size="lg" class="task-item__icon"
                                   @click="markComplete(task.id)"/>
            </div>
            <div class="task-item__content">
                <div class="task-item__text"> {{ task.text }} </div>
            </div>
            <div class="task-item__footer">
                <font-awesome-icon icon="pen" class="task-item__icon" />
                <font-awesome-icon icon="trash" class="task-item__icon"
                                   @click="removeTask(task.id)"/>
            </div>
        </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import BASEURL from '../api';

library.add(faPen);
library.add(faCheck);
library.add(faTrash);

export default {
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
      const taskToUpdate = this.tasks.filter(task => task.id === id)[0];
      taskToUpdate.completed = !taskToUpdate.completed;
      axios
        .put(`${BASEURL}/tasks/${id}`, taskToUpdate)
        .then((res) => {
          this.tasks = [...this.tasks.filter(task => task.id !== id), res.data];
        });
    },
  },
};
</script>

<style lang="scss">
    .task-list {
        display: flex;
        flex-wrap: wrap;

        .task-item {
            width: 250px;
            background-color: #fff475;
            border-color: #fff475;
            border-radius: 5px;
            margin: 0.8em;
            padding: 20px;
            text-align: left;

            &:hover {
                background-color: #efe474;
                transition: .5s ease;
            }

            &__header, &__footer {
                display: flex;
                justify-content: space-between;
            }

            &__title {
                font-weight: 700;
            }

            &__icon {
                color: #2c3e50;
                visibility: hidden;
                opacity: 0;
                transition: visibility 0s linear 300ms, opacity 300ms;
                cursor: pointer;
                &:hover {
                    color: black;
                }
            }

            &:hover {
                .task-item__icon {
                    visibility: visible;
                    opacity: 1;
                    transition: visibility 0s linear 0s, opacity 300ms;
                }
            }

            &__content {
                margin-bottom: 2.5em;
            }

        }

        .task-item-completed {
            background-color: #fff8b7;

            .task-item__title, .task-item__text {
                text-decoration: line-through;
            }
        }
    }
</style>
