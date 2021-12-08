let config;

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  config = require('./prod');
} else {
  config = require('./dev');
}

module.exports = config;