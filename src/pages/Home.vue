<template>
  <!-- Controls -->
  <div class="flex justify-center mb-4">
    <form class="flex items-center" @submit.prevent="startPoll">
      <input
        type="text"
        class="text-xl px-3 py-2 rounded-l-lg focus:outline-none"
        placeholder="Channel name"
        v-model="channel"
      />

      <div class="flex items-center gap-2 pr-3 bg-white text-neutral-700 rounded-r-lg h-full">
        <PlayIcon class="h-6 w-6 cursor-pointer" @click="startPoll" />
        <StopIcon class="h-6 w-6 cursor-pointer" @click="stopPoll" />
      </div>
    </form>
  </div>

  <div
    v-if="pollRunning && sortedResponses.length === 0"
    class="text-center text-white p-16 rounded-xl"
    :class="[bgSecondary, { 'text-neutral-700': bgSecondary === 'bg-white' }]"
  >
    <span>Waiting for response...</span>
  </div>

  <!-- Responses -->
  <div v-else-if="sortedResponses.length > 0" class="max-w-lg mx-auto">
    <div
      class="flex gap-2 justify-end items-center text-white mb-2"
      :class="{ 'text-neutral-700': bgSecondary === 'bg-white' }"
    >
      <span>Total responses: {{ users.length }}</span>
      <TrashIcon class="h-6 w-6cursor-pointer" @click="clearPoll" />
    </div>

    <ul>
      <li
        class="flex justify-between text-white p-5 mb-5 text-4xl rounded-xl"
        :class="[bgSecondary, { 'text-neutral-700': bgSecondary === 'bg-white' }]"
        v-for="response in sortedResponses"
        :key="response.text"
      >
        <span>{{ response.text }}</span>
        <span>{{ response.count }}</span>
      </li>
    </ul>
  </div>

  <!-- How does it work? -->
  <HowDoesItWork v-else :bgSecondary="bgSecondary" />
</template>

<script>
import { PlayIcon, StopIcon, TrashIcon } from '@heroicons/vue/outline';

import HowDoesItWork from '../components/HowDoesItWork.vue';

export default {
  name: 'Home',

  components: {
    PlayIcon,
    StopIcon,
    TrashIcon,
    HowDoesItWork
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

  data() {
    return {
      channel: '',
      client: null,
      error: '',
      pollRunning: false,
      showSettings: false,
      socketID: '',
      responses: [],
      users: []
    };
  },

  computed: {
    sortedResponses() {
      return this.responses.sort((a, b) => b.count - a.count);
    }
  },

  methods: {
    clearPoll() {
      this.responses = [];
      this.stopPoll();
    },

    startPoll() {
      if (this.channel) {
        this.openConnection();
        this.pollRunning = true;
      }
    },

    stopPoll() {
      if (this.channel) {
        this.closeConnection();
        this.pollRunning = false;
      }
    },

    async closeConnection() {
      if (this.client) {
        this.client.disconnect();
        this.client = '';
        this.error = '';
      }
    },

    async openConnection() {
      this.client = new tmi.Client({
        connection: { reconnect: true },
        channels: [this.channel]
      });

      await this.connect();

      if (this.client) {
        this.error = '';
        this.responses = [];
        this.users = [];
      } else {
        this.error = 'Unable to connect to chat';
      }
    },

    async connect() {
      try {
        await this.client.connect();

        this.client.on('chat', (channel, tags, message, self) => {
          if (this.settings.subsOnly) {
            if (tags.subscriber) {
              this.validateMessage(message, tags);
            }
          } else {
            this.validateMessage(message, tags);
          }
        });
      } catch (error) {
        console.log('Error connecting to chat');
      }
    },

    handleResponse(res) {
      this.users.push(res.user);

      if (this.responses.some(response => response.text === res.message)) {
        const index = this.responses.findIndex(response => response.text === res.message); // Get index of matching response
        this.responses[index].count++; // Increment word count if it already exists
      } else {
        this.responses.push({ text: res.message, count: 1 }); // Push word and set count to 1 if response doesn't exist
      }
    },

    validateMessage(message, tags) {
      if (this.users.some(user => user === tags['display-name'])) {
        console.log('[DEBUG] User already responded.');
      } else if (message.split(' ').length > 1) {
        console.log('[DEBUG] User submitted more than 1 word.');
      } else {
        message = this.sanitizeText(message);

        // If message is just special characters, it will end up as an empty string
        if (message) {
          this.handleResponse({ user: tags['display-name'], message });
        }
      }
    },

    // Remove whitespace, lowercase, and replace special characters with empty string
    sanitizeText(text) {
      const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      text = text.trim().toLowerCase();
      text = text.replace(regex, '');

      return text;
    }
  }
};
</script>

<style>
h1,
li {
  font-family: 'Paytone One', Arial, Helvetica, sans-serif;
}
</style>
