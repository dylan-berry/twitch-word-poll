const express = require('express');
const app = express();

app.use(express.static('public'));

const chat = require('./chat.js');

const bot = {
  client: undefined,
  responses: [],
  users: []
};

app.get('/channel/:channel', (req, res) => {
  try {
    if (!bot.client) {
      chat.connect(bot, req.params.channel);
      res.status(200).send({ msg: 'Connected' });
    } else {
      chat.disconnect(bot);
      res.status(200).send({ msg: 'Disconnected' });
    }
  } catch (error) {
    res.status(400).send({ msg: 'Error' });
  }
});

app.listen('3000', () => {
  console.log('Listening on port 3000');
});
