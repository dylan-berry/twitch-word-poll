const socketIO = require('socket.io');
let io;

module.exports = {
  init: server => {
    io = socketIO(server);
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error('socket is not initialized');
    }
    return io;
  }
};
