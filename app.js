const express = require('express');
const app = express();

app.use(express.static('public'));

const server = app.listen('3000', () => {
  console.log('Listening on port 3000');
});

const io = require('./socket.js').init(server);

const connect = require('./connect.js');
const disconnect = require('./disconnect.js');

const bot = {
  client: undefined,
  responses: [],
  users: []
};

app.get('/channel/:channel', (req, res) => {
  try {
    if (!bot.client) {
      connect(bot, req.params.channel);
      res.status(200).send({ msg: 'Connected' });
    } else {
      disconnect(bot);
      res.status(200).send({ msg: 'Disconnected' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error' });
  }
});

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);
});
