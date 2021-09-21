const mongoose = require('mongoose');
const { options, dbConnectionUrl } = require('./dbConfig');

function dbConnect() {
  mongoose.connect(dbConnectionUrl, options, (error) => {
    if (error) return console.log(error);
    console.log('db connected');
  });
}

function dbDisconnect() {
  mongoose.disconnect();
}

module.exports = {
  dbConnect,
  dbDisconnect,
};
