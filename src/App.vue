<template>
  <ThemeSwitch />
  <AppHeader />
  <AppFilters :active-filter="activeFilter" @set-filter="setFilter" />
  <main class="app-main">
    <AppTodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @remove-todo="removeTodo"
    />
    <AppAddTodo @add-todo="addTodo" />
  </main>
  <AppFooter :stats="stats" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeSwitch from './components/ThemeSwitch.vue';
import AppHeader from './components/AppHeader.vue';
import AppFilters from './components/AppFilters.vue';
import AppFooter from './components/AppFooter.vue';
import AppTodoList from './components/AppTodoList.vue';
import AppAddTodo from './components/AppAddTodo.vue';
import Todo from './types/Todo';
import { Filter } from './types/Filter';
import { Stats } from './types/Stats';

interface State {
  todos: Todo[];
  activeFilter: Filter;
}

export default defineComponent({
  data(): State {
    return {
      todos: [
        { id: 0, text: 'Some first', completed: true },
        { id: 1, text: 'Some second', completed: false }
      ],
      activeFilter: 'All'
    };
  },

  components: {
    AppFooter,
    AppFilters,
    AppHeader,
    AppTodoList,
    AppAddTodo,
    ThemeSwitch
  },
  computed: {
    filteredTodos(): Todo[] {
      switch (this.activeFilter) {
        case 'Active':
          return this.activeTodos;
        case 'Done':
          return this.doneTodos;
        case 'All':
        default:
          return this.todos;
      }
    },
    stats(): Stats {
      return {
        active: this.activeTodos.length,
        done: this.doneTodos.length
      };
    },
    activeTodos(): Todo[] {
      return this.todos.filter((todo: Todo) => !todo.completed);
    },
    doneTodos(): Todo[] {
      return this.todos.filter((todo: Todo) => todo.completed);
    }
  },
  methods: {
    addTodo(todo: Todo): void {
      const isUnique = !this.todos.some(
        (existingTodo) => existingTodo.text === todo.text
      );
      if (isUnique) {
        this.todos.push(todo);
      }
    },
    toggleTodo(id: number): void {
      const targetTodo = this.todos.find((todo: Todo) => todo.id === id);
      if (targetTodo) {
        targetTodo.completed = !targetTodo.completed;
      }
    },
    removeTodo(id: number): void {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
      console.log(id);
    },
    setFilter(filter: Filter): void {
      this.activeFilter = filter;
    }
  }
});
</script>
