const disconnect = bot => {
  bot.client.disconnect();
  bot.client = undefined;
};

module.exports = disconnect;
