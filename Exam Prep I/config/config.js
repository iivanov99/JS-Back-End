const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8080,
    dbPath: 'mongodb://localhost:27017/exam-prep-1',
  },
  production: {}
};

module.exports = config[env];