<template>
  <div class="container mx-auto">
    <div class="max-w-xl mx-auto px-5">
      <form class="text-center" @submit.prevent="submitChannel">
        <input type="text" class="text-xl border-b mr-3 py-1 px-2" placeholder="Channel name" v-model="channel" />
        <button class="rounded text-white py-1 px-3" :class="btnColor">{{ btnText }}</button>
        <p v-if="error" class="text-red-500 text-sm my-3">{{ error }}</p>
      </form>
      <p class="text-right mt-10">Total responses: {{ users.length }}</p>
      <ul>
        <li
          class="flex justify-between p-5 mb-5 text-5xl border rounded"
          v-for="response in sortedResponses"
          :key="response.text"
        >
          <span>{{ response.text }}</span>
          <span>{{ response.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      btnColor: 'bg-green-500',
      btnText: 'Connect',
      channel: '',
      client: null,
      error: '',
      socketID: '',
      responses: [],
      users: []
    };
  },

  computed: {
    sortedResponses: function () {
      return this.responses.sort((a, b) => b.count - a.count);
    }
  },

  methods: {
    submitChannel() {
      if (this.channel) {
        this.btnText === 'Connect' ? this.openConnection() : this.closeConnection();
      } else {
        this.error = 'Must enter channel name.';
      }
    },

    async closeConnection() {
      this.client.disconnect();
      this.client = '';

      this.btnText = 'Connect';
      this.btnColor = 'bg-green-500';
      this.error = '';
    },

    async openConnection() {
      this.client = new tmi.Client({
        connection: { reconnect: true },
        channels: [this.channel]
      });

      await this.connect();

      if (this.client) {
        this.btnText = 'Disconnect';
        this.btnColor = 'bg-red-500';
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
          if (this.users.some(user => user === tags['display-name'])) {
            console.log('[DEBUG] User already responded.');
          } else if (message.split(' ').length > 1) {
            console.log('[DEBUG] User submitted more than 1 word.');
          } else {
            message = this.sanitizeText(message);
            this.handleResponse({ user: tags['display-name'], message });
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

    sanitizeText(text) {
      const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      text = text.trim().toLowerCase();
      text = text.replace(regex, '');

      return text;
    }
  }
};
</script>

<style></style>
