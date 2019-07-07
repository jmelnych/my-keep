<template>
    <ul class="nav">
        <li :class="{'nav-active': filterQuery === 'todo'}"
            @click="$emit('filter-tasks', 'todo')">Current tasks</li>
        <li :class="{'nav-active': filterQuery === 'archived'}"
            @click="$emit('filter-tasks', 'archived')">Archived</li>
        <li :class="{'nav-active': filterQuery === 'all'}"
            @click="$emit('filter-tasks', 'all')">All tasks</li>
    </ul>
</template>

<script>
export default {
  name: 'side-navigation',
  props: {
    filterQuery: String,
  },
};
</script>

<style lang="scss">
    .nav {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.2em;
        min-width: 250px;
        min-height: 400px;
        background-color: #ececec;
        border-radius: 5px;
        margin: 10px 10px 0 10px;
        padding: 20px;
        height: 100%;

        &-active {
            font-weight: 700;
        }

        li {
            text-align: left;
            width: 100%;
            padding: 5px 0;
            margin: 5px 0;
            cursor: pointer;

            &:hover {
                font-weight: 800;
                transition: visibility 0s linear 0s, opacity 300ms;
            }
        }
    }
</style>
