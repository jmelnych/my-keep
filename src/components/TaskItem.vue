<template>
  <li class="task-item">
        <div class="task-item__header">
          <div class="task-item__title"> {{ task.title }} </div>
          <font-awesome-icon icon="check" size="lg" class="task-item__icon"
                             @click="$emit('mark-complete', task.id)"/>
        </div>
        <div class="task-item__content">
          <div class="task-item__text"> {{ task.text }} </div>
        </div>
        <div class="task-item__footer">
          <font-awesome-icon icon="pen" class="task-item__icon" />
          <font-awesome-icon icon="trash" class="task-item__icon"
                             @click="$emit('remove-task', task.id)"/>
        </div>
  </li>
</template>

<script>


import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';


library.add(faPen);
library.add(faCheck);
library.add(faTrash);

export default {
  name: 'task-item',
  props: {
    task: Object,
  },
};
</script>

<style lang="scss">

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

</style>
