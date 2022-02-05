<template>
  <div class="text-white p-5 rounded-xl" :class="[bgSecondary, { 'text-neutral-700': bgSecondary === 'bg-white' }]">
    <h1 class="text-4xl mb-4">Settings</h1>

    <div class="flex justify-between mb-4">
      <label for="subs">Subscribers only</label>
      <ToggleCheckbox v-model="subsOnly" id="subs" />
    </div>

    <button class="px-5 py-2 rounded-xl mr-4" :class="bgPrimary" @click="$emit('back')">Back</button>
    <button class="px-5 py-2 rounded-xl" :class="bgPrimary" @click="applySettings">Apply</button>
  </div>
</template>

<script>
import ToggleCheckbox from './ToggleCheckbox.vue';

export default {
  name: 'Settings',

  components: {
    ToggleCheckbox
  },

  props: {
    bgPrimary: {
      type: String,
      required: true
    },

    bgSecondary: {
      type: String,
      required: true
    },

    settings: {
      type: Object,
      required: true
    }
  },

  emits: ['apply', 'back'],

  created() {
    this.subsOnly = this.settings.subsOnly;
  },

  data() {
    return {
      subsOnly: false
    };
  },

  methods: {
    applySettings() {
      const settings = {
        subsOnly: this.subsOnly
      };

      this.$emit('apply', settings);
    }
  }
};
</script>

<style></style>
