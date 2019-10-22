const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config');
const apiRouter = require('./api');
const app = express();

// app.use(cors({
//   origin: 'http://localhost:4200',
//   credentials: true
// }));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', apiRouter);

app.set('json replacer', (key, value) => {
  if (key === 'password') { return undefined; }
  return value;
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.listen(config.port, () => {
  console.log(`Server: Listening on ${config.port}...`);
});