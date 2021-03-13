const disconnect = bot => {
  bot.client.disconnect();

  bot.client = undefined;
  bot.responses = [];
  bot.users = [];
};

module.exports = disconnect;
