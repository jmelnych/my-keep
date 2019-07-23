<template>
  <div class="text-box">
    <label class="text-box__label" for="tb-input"></label>
    <input id="tb-input" type="text"
           class="text-box__title"
           @keyup.enter="moveNextInputBox"
           v-model="task.title"
    >
    <textarea id="tb-text-area"
              class="text-box__text"
              v-model="task.text"
              @keyup.enter="updateTask"
    ></textarea>
  </div>
</template>
<script>

import axios from 'axios';
import api from '../api';

export default {
  name: 'task-edit',
  data() {
    return {
      task: Object,
      error: null,
    };
  },
  mounted() {
    const { id } = this.$route.params;
    axios
      .get(`${api.URL}/${id}`, { headers: { 'x-apikey': api.secretKey }})
      .then((res) => {
        this.task = res.data;
      })
      .catch((error) => this.error = error);
  },
  methods: {
    moveNextInputBox() {
      const nextBox = document.getElementById('tb-text-area');
      nextBox.focus();
      nextBox.select();
    },
    updateTask() {
      if (this.task.title.trim() || this.task.text.trim()) {
        const { id } = this.$route.params;
        axios.put(`${api.URL}/${id}`, this.task, { headers: { 'x-apikey': api.secretKey }})
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => this.error = error);
      }
    },
  },
};

</script>
