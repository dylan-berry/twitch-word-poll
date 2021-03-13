const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.static('public'));

const server = app.listen('3000', () => {
  console.log('Listening on port 3000');
});

const io = require('./socket.js').init(server);

const connect = require('./connect.js');
const disconnect = require('./disconnect.js');

let bots = [];

app.get('/channel/:channel/:id', (req, res) => {
  const bot = bots.find(bot => bot.socket.id === req.params.id);

  try {
    if (!bot.client) {
      connect(bot, req.params.channel);
      res.status(200).send({ msg: 'Connected' });
    } else {
      disconnect(bot);
      bots = bots.filter(bot => bot.socket.id !== req.params.id);
      res.status(200).send({ msg: 'Disconnected' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error' });
  }
});

io.on('connection', socket => {
  socket.emit('connection', socket.id);

  bots.push({
    client: undefined,
    socket: socket,
    responses: [],
    users: []
  });
});
