const mongoose = require('mongoose');

module.exports = (config) => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.once('open', (err) => {
    if (err) throw err;
    console.log('Database Ready!');
  });
  db.on('error', (reason) => console.log(reason));
};