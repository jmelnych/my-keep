<template>
  <li class="task-item">
        <div class="task-item__header">
          <div class="task-item__title"> {{ task.title }} </div>
          <font-awesome-icon icon="check" size="lg" class="task-item__icon"
                             @click="$emit('complete-task', task.id)"/>
        </div>
        <div class="task-item__content">
          <div class="task-item__text"> {{ task.text }} </div>
        </div>
        <div class="task-item__footer">
          <router-link :to="{ name: 'edit', params: { id: task.id }}">
            <font-awesome-icon icon="pen" class="task-item__icon" />
          </router-link>
          <font-awesome-icon icon="archive" class="task-item__icon"
                               @click="$emit('archive-task', task.id)"/>
          <font-awesome-icon icon="trash" class="task-item__icon"
                             @click="$emit('remove-task', task.id)"/>

        </div>
  </li>
</template>

<script>


import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash, faPen, faCheck, faArchive,
} from '@fortawesome/free-solid-svg-icons';


library.add(faPen);
library.add(faCheck);
library.add(faTrash);
library.add(faArchive);

export default {
  name: 'task-item',
  props: {
    task: Object,
  },
};
</script>

<style scoped lang="scss">

  .task-item {
    $self: &;
    width: 250px;
      height: 150px;
    background-color: #fff475;
    border-color: #fff475;
    border-radius: 5px;
    margin: 10px 10px 0 10px;
    padding: 20px;
    text-align: left;

    &:hover {
      background-color: #efe474;
      transition: .5s ease;
    }

    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
        &>*:not(:last-child) {
            margin-right: 15px;
        }
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

      &-completed {
        background-color: #fff8b7;

          #{ $self }__title, #{ $self }__text {
          text-decoration: line-through;
        }
      }

      &-archived {
          background-color: #d1d1d1;
          &:hover {
              background-color: #c5c5c5;
              transition: visibility 0s linear 0s, opacity 300ms;
          }
      }
  }


</style>
