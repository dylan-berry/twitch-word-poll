require('dotenv').config();

const express = require('express');
const axios = require('axios');

const { ApiClient } = require('twitch');
const { StaticAuthProvider } = require('twitch-auth');
const { ChatClient } = require('twitch-chat-client');

// const app = express();

const authProvider = new StaticAuthProvider(process.env.CLIENT_ID, process.env.ACCESS_TOKEN);
const apiClient = new ApiClient({ authProvider });

const readMessages = async channel => {
  const chatClient = new ChatClient(authProvider, { channels: [channel] });
  await chatClient.connect();

  const messageListener = chatClient.onMessage((channel, user, message, msg) => {
    console.log(`${user}: ${message}`);
  });
};

readMessages('grizzlyberry');

// app.listen('3000', () => {
//   console.log('Listening on port 3000');
// });

// const getAccessToken = async () => {
//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

//   try {
//     const res = await axios.post(url);
//     return res.data.access_token;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
