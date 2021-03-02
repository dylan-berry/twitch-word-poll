const tmi = require('tmi.js');

const connect = async (bot, channel) => {
  const io = require('./socket.js').get();

  bot.client = new tmi.Client({
    connection: { reconnect: true },
    channels: [channel]
  });

  try {
    await bot.client.connect();

    bot.client.on('message', (channel, tags, message, self) => {
      message = message.trim().toLowerCase();
      // if (bot.users.some(user => user === tags['display-name'])) {
      //   console.log('User already answered.');
      // }
      if (message.split(' ').length > 1) {
        console.log('User submitted more than 1 word.');
      } else {
        bot.users.push(tags['display-name']); // Push user to array
        if (bot.responses.some(response => response.text === message)) {
          const index = bot.responses.findIndex(response => response.text === message); // Get index of matching response
          bot.responses[index].count++; // Increment word count if it already exists
          io.emit('response', { responses: bot.responses, users: bot.users });
        } else {
          bot.responses.push({ text: message, count: 1 }); // Push word and set count to 1 if response doesn't exist
          io.emit('response', { responses: bot.responses, users: bot.users });
        }
      }
    });
  } catch (error) {
    console.log('Error connecting to chat');
  }
};

module.exports = connect;
