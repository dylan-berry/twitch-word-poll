<template>
  <div class="flex rounded-full w-10 p-1 items-center ease-in-out duration-500" :class="bgColor">
    <input
      v-model="modelValue"
      type="checkbox"
      class="bg-white rounded-full w-4 h-4 appearance-none cursor-pointer ease-in-out duration-300"
      :class="{ 'translate-x-4': modelValue }"
    />
  </div>
</template>

<script>
export default {
  name: 'ToggleCheckbox',

  props: {
    modelValue: {
      type: Boolean
    }
  },

  emit: ['update:modelValue'],

  computed: {
    bgColor() {
      return this.modelValue ? ['bg-emerald-400'] : ['bg-neutral-300'];
    }
  },

  watch: {
    modelValue(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  }
};
</script>

<style></style>
