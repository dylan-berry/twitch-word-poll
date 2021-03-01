const socketIO = require('socket.io');
const express = require('express');
const app = express();

app.use(express.static('public'));

const chat = require('./chat.js');

const bot = {
  client: undefined,
  responses: [],
  users: [],
};

app.get('/channel/:channel', (req, res) => {
  try {
    if (!bot.client) {
      chat.connect(bot, req.params.channel, io);
      res.status(200).send({ msg: 'Connected' });
    } else {
      chat.disconnect(bot);
      res.status(200).send({ msg: 'Disconnected' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error' });
  }
});

const server = app.listen('3000', () => {
  console.log('Listening on port 3000');
});

const io = socketIO(server);

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);
  // socket.emit('response', data);
});
