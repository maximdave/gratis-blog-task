var mongoose = require('mongoose');

var dotenv = require('dotenv');
dotenv.config();

let database;

function connect() {
  const uri = process.env.MONGODB_URI;
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
}


module.exports = {
  connect: connect,
};
