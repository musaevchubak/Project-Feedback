require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

const dbConnectionUrl = process.env.dbConnectionUrl;

module.exports = {
  options,
  dbConnectionUrl,
}
