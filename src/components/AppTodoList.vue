<template>
  <AppTodoItem
    @toggleTodo="toggleTodo"
    @removeTodo="removeTodo"
    :todo="todo"
    :key="todo.id"
    v-for="todo in todos"
  />
  <ul class="todo-list"></ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AppTodoItem from './AppTodoItem.vue';
import Todo from '@/types/Todo';

export default defineComponent({
  components: { AppTodoItem },
  props: {
    todos: {
      type: Array as PropType<Todo[]>
    }
  },
  methods: {
    toggleTodo(id: number): void {
      this.$emit('toggleTodo', id);
    },
    removeTodo(id: number): void {
      this.$emit('removeTodo', id);
    }
  },
  emits: {
    toggleTodo: (id: number) => Number.isInteger(id),
    removeTodo: (id: number) => Number.isInteger(id)
  }
});
</script>
