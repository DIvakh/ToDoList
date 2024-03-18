<template>
  <div class="theme">
    <label class="switch">
      <input type="checkbox" v-model="checkbox" />
      <div class="slider round"></div>
    </label>
    <p>Switch to {{ themeText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      checkbox: false as boolean
    };
  },
  mounted() {
    const darkTheme = localStorage.getItem('darkTheme');
    if (darkTheme) {
      this.checkbox = JSON.parse(darkTheme);
      const body = document.querySelector('body');
      if (body) {
        body.classList.toggle('dark', this.checkbox);
      }
    }
  },
  computed: {
    themeText(): string {
      return this.checkbox ? 'Light theme' : 'Dark theme';
    }
  },
  watch: {
    checkbox: 'toggleDarkMode'
  },
  methods: {
    toggleDarkMode() {
      const body = document.querySelector('body');
      if (body) {
        body.classList.toggle('dark', this.checkbox);
        localStorage.setItem('darkTheme', JSON.stringify(this.checkbox));
      }
    }
  }
});
</script>
