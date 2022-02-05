<template>
  <!-- Background -->
  <div class="fixed w-screen h-screen -z-10" :class="bgPrimary"></div>

  <!-- Header -->
  <div class="flex justify-between mb-10 p-3">
    <nav class="text-white text-2xl" :class="{ 'text-neutral-700': bgSecondary === 'bg-white' }">Twitch Word Poll</nav>

    <div class="flex gap-2 items-center">
      <CogIcon
        class="h-6 w-6 text-white cursor-pointer"
        :class="{ 'text-neutral-700': bgSecondary === 'bg-white' }"
        @click="showSettings = true"
      />

      <div class="flex gap-2 items-center bg-white px-2 py-1 rounded-full">
        <div
          v-for="color of colors"
          class="rounded-full h-6 w-6 cursor-pointer"
          :class="[`bg-${color}-500`, { 'border-2': color === 'white', 'border-neutral-700': color === 'white' }]"
          @click="changeColor(color)"
        ></div>
      </div>
    </div>
  </div>

  <div class="max-w-lg mx-auto px-5 pb-5">
    <!-- Settings -->
    <Settings
      v-if="showSettings"
      :bgPrimary="bgPrimary"
      :bgSecondary="bgSecondary"
      :settings="settings"
      @apply="applySettings"
      @back="showSettings = false"
    />

    <!-- Form and responses -->
    <Home v-else :bgPrimary="bgPrimary" :bgSecondary="bgSecondary" :settings="settings" />
  </div>
</template>

<script>
import { CogIcon } from '@heroicons/vue/outline';

import Home from './pages/Home.vue';
import Settings from './components/Settings.vue';

export default {
  name: 'App',

  components: { CogIcon, Home, Settings },

  data() {
    return {
      colors: ['white', 'blue', 'indigo', 'neutral'],
      currentColor: 'indigo',
      settings: { subsOnly: false },
      showSettings: false
    };
  },

  computed: {
    bgPrimary() {
      if (this.currentColor === 'white') {
        return 'bg-gray-200';
      } else if (this.currentColor === 'neutral') {
        return 'bg-neutral-900';
      } else {
        return `bg-${this.currentColor}-700`;
      }
    },

    bgSecondary() {
      if (this.currentColor === 'white') {
        return 'bg-white';
      } else if (this.currentColor === 'neutral') {
        return 'bg-neutral-700';
      } else {
        return `bg-${this.currentColor}-500`;
      }
    }
  },

  methods: {
    applySettings(settings) {
      this.settings = settings;
      this.showSettings = false;
    },

    changeColor(color) {
      this.currentColor = color;
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}

nav {
  font-family: 'Paytone One', Arial, Helvetica, sans-serif;
}
</style>
