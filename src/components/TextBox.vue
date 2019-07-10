<template>
    <div class="text-box">
        <label class="text-box__label" for="tb-input"></label>
        <input id="tb-input" type="text"
               v-model="newTaskTitle"
               class="text-box__title"
               @keyup.enter="moveNextInputBox"
               placeholder="Title...">
        <textarea v-model="newTaskText"
              id="tb-text-area"
              class="text-box__text"
              placeholder="Text..."
              @keyup.enter="addTask"
        ></textarea>
    </div>
</template>

<script>
import axios from 'axios';
import BASEURL from '../api';

export default {
  name: 'text-box',
  data() {
    return {
      newTaskTitle: '',
      newTaskText: '',
      error: '',
    };
  },
  methods: {
    moveNextInputBox() {
      const nextBox = document.getElementById('tb-text-area');
      nextBox.focus();
      nextBox.select();
    },
    addTask() {
      if (this.newTaskTitle.trim() || this.newTaskText.trim()) {
        const newTaskObj = {
          title: this.newTaskTitle,
          text: this.newTaskText,
          completed: false,
          archived: false,
        };
        axios
          .post(`${BASEURL}/tasks`, newTaskObj)
          .then((res) => {
            this.$root.$emit('addTaskEvent', res.data);
          })
          .catch(err => this.error = err);

        this.newTaskTitle = '';
        this.newTaskText = '';
      }
    },
  },
};
</script>

<style lang="scss">
    .text-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;

        &__title, &__text {
            padding: 10px 8px;
            border-width: 1px 1px 1px 1px;
            border: 1px solid #cfcfb7;

            &:focus {
                outline: none;
            }
        }

        &__title {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            font-size: 1em;
            font-weight: 700;
            border-bottom: none;
        }

        &__text {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            font-size: 0.9em;
            margin-bottom: 16px;
            border-top: none;
        }
    }

</style>
