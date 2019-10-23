const config = require('./config/config');
global.__basedir = __dirname;

(async () => {
  await require('./config/database');
  console.log('Database ready!');

  const app = require('express')();
  require('./config/express')(app);
  require('./config/routes')(app);

  app.listen(config.port, console.log(`Server listening on port ${config.port}...`));
})();