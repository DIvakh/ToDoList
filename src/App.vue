<template>
  <ThemeSwitch></ThemeSwitch>
  <AppHeader></AppHeader>
  <AppFilters></AppFilters>
  <main class="app-main">
    <AppTodoList />
    <AppAddTodo />
  </main>
  <AppFooter></AppFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeSwitch from './components/ThemeSwitch.vue';
import AppHeader from './components/AppHeader.vue';
import AppFilters from './components/AppFilters.vue';
import AppFooter from './components/AppFooter.vue';
import AppTodoList from './components/AppTodoList.vue';
import AppAddTodo from './components/AppAddTodo.vue';

export default defineComponent({
  data() {
    return {
      checkbox: false as boolean
    };
  },
  components: {
    AppFooter,
    AppFilters,
    AppHeader,
    AppTodoList,
    AppAddTodo,
    ThemeSwitch
  }
});
</script>

<style lang="scss"></style>
