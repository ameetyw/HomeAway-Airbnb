const logger = require('../services/logger.service');

async function log(req, res, next) {
  // console.log('req session:', req.session);
  if (req.session && req.session.user) {
    logger.info('Req from: ' + req.session.user.fullname);
  }
  next();
}

module.exports = {
  log
};