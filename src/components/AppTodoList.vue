<template>
  <AppTodoItem
    @toggleTodo="toggleTodo"
    :todo="todo"
    :key="todo.id"
    v-for="todo in todos"
  />
  <ul class="todo-list"></ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppTodoItem from './AppTodoItem.vue';

import Todo from '@/types/Todo';

export default defineComponent({
  components: { AppTodoItem },
  data(): Todo {
    return {
      todos: [
        { id: 0, text: 'Some first', completed: true },
        { id: 1, text: 'Some second', completed: false }
      ]
    };
  },
  methods: {}
});
</script>
