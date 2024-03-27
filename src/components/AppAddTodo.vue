<template>
  <section class="add-todo">
    <button
      v-if="!isFormVisible"
      class="add-todo__show-form-button"
      @click="showForm"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
    <form @submit.prevent="addTodo" v-else class="add-todo__form">
      <button class="close-button" type="button" @click="closeForm">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input v-model="todoText" class="input" v-focus />
      </div>
      <button class="button button--filled">Add task</button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Todo from '@/types/Todo';

interface State {
  isFormVisible: boolean;
  todoText: string;
}

export default defineComponent({
  data(): State {
    return {
      isFormVisible: false,
      todoText: ''
    };
  },
  methods: {
    showForm(): void {
      this.isFormVisible = true;
    },
    closeForm(): void {
      this.isFormVisible = false;
    },
    addTodo(): void {
      if (this.todoText.length > 0) {
        this.$emit('addTodo', {
          id: Date.now(),
          text: this.todoText,
          completed: false
        });
      }
      this.todoText = '';
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      }
    }
  },
  emits: { addTodo: (todo: Todo) => todo }
});
</script>
