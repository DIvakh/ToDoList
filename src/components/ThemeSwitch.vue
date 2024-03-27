<template>
  <div class="theme-settings">
    <div class="system-settings">
      <input
        v-model="isUseSystem"
        type="checkbox"
        name="systemSettings"
        id="systemSettings"
        class="systemSettings"
        @change="systemCheckboxHandler"
      />
      <label for="systemSettings">Use system preferences</label>
    </div>
    <div class="theme" :class="{ disabled: isUseSystem }">
      <label class="switch">
        <input
          :disabled="isUseSystem"
          class="theme-switch"
          type="checkbox"
          @change="themeCheckboxHandler"
          v-model="turnedDarkTheme"
        />
        <div class="slider round"></div>
      </label>
      <p>Switch to {{ themeText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Theme } from '@/types/ColorTheme';

export default defineComponent({
  data(): { turnedDarkTheme: boolean; isUseSystem: boolean } {
    return {
      turnedDarkTheme: false,
      isUseSystem: false
    };
  },
  mounted(): void {
    this.checkLocal();
  },
  computed: {
    themeText(): string {
      return this.turnedDarkTheme ? 'Light theme' : 'Dark theme';
    }
  },

  methods: {
    isSystemDark(): boolean {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    checkLocal(): void {
      this.isUseSystem = JSON.parse(
        localStorage.getItem('useSystemTheme') || 'false'
      );
      this.turnedDarkTheme = JSON.parse(
        localStorage.getItem('darkTheme') || 'false'
      );

      if (this.isUseSystem) {
        this.turnedDarkTheme = this.isSystemDark();
        this.useTheme(this.turnedDarkTheme ? 'dark' : 'white');
        return;
      } else {
        this.useTheme(this.turnedDarkTheme ? 'dark' : 'white');
        return;
      }
    },

    useTheme(theme: Theme): void {
      const body: HTMLElement | null = document.querySelector('body');

      if (theme === 'dark' && body) {
        body.classList.add('dark');

        this.writeToLocal('darkTheme', true);
      } else if (theme === 'white' && body) {
        body.classList.remove('dark');
        this.writeToLocal('darkTheme', false);
      }
    },
    writeToLocal(option: 'darkTheme' | 'useSystemTheme', value: boolean) {
      localStorage.setItem(option, JSON.stringify(value));
    },
    systemCheckboxHandler(): void {
      this.turnedDarkTheme = this.isSystemDark();
      this.useTheme(this.turnedDarkTheme ? 'dark' : 'white');

      this.writeToLocal('useSystemTheme', this.isUseSystem);
    },
    themeCheckboxHandler(): void {
      this.useTheme(this.turnedDarkTheme ? 'dark' : 'white');
      this.writeToLocal('darkTheme', this.turnedDarkTheme);
    }
  }
});
</script>
