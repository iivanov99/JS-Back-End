const database = require('./database');

(async () => {
  await database;
  console.log('Successfully connected to the database');
  require('./main');
})();