var _ = require('lodash');

var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.Port || 3000,
  expireTime: 10 * 24 * 60,
  secrets: {
    jwt: process.env.JWT || 'SECRET'
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(err) {
  console.log(err);
  envConfig = {};
}

module.exports = _.merge(config, envConfig);