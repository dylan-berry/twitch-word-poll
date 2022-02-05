<template>
  <!-- How does it work? -->
  <div class="mx-auto">
    <div class="text-white p-5 rounded-xl" :class="[bgSecondary, { 'text-neutral-700': bgSecondary === 'bg-white' }]">
      <h1 class="text-4xl mb-4">How does it work?</h1>

      <div class="mb-6">
        <div class="flex gap-2 items-center">
          <PlayIcon class="inline h-6 w-6" />
          <span>Start poll</span>
        </div>
        <p class="ml-8 text-sm">The poll will begin monitoring Twitch chat.</p>
      </div>

      <div class="mb-6">
        <div class="flex gap-2 items-center">
          <StopIcon class="inline h-6 w-6" />
          <span>Stop poll</span>
        </div>
        <p class="ml-8 text-sm">The app will stop monitoring Twitch chat.</p>
      </div>

      <div class="mb-6">
        <div class="flex gap-2 items-center">
          <TrashIcon class="inline h-6 w-6" />
          <span>Clear poll</span>
        </div>
        <p class="ml-8 text-sm">Clear all answers and stop the poll.</p>
      </div>

      <div class="mb-6">
        <div class="flex gap-2 items-center">
          <CogIcon class="inline h-6 w-6" />
          <span>Settings</span>
        </div>
        <p class="ml-8 text-sm">Adjust settings, such as turning on subs only.</p>
      </div>

      <div>
        <div class="flex gap-2 items-center">
          <InformationCircleIcon class="inline h-6 w-6" />
          <span>Additional Information</span>
        </div>
        <p class="ml-8 text-sm">
          By default, only <span class="font-bold">one word</span> answers are accepted, and each chat member can only vote
          <span class="font-bold">once</span>
          per poll.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { CogIcon, InformationCircleIcon, PlayIcon, StopIcon, TrashIcon } from '@heroicons/vue/outline';
export default {
  name: 'HowDoesItWork',

  components: { CogIcon, InformationCircleIcon, PlayIcon, StopIcon, TrashIcon },

  props: {
    bgSecondary: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
