const logger = require('winston');

logger.clear();

logger.cli();

logger.add(logger.transports.File,
{ filename: './logs/error.log', level: 'error' });

if (process.env.NODE_ENV !== 'test') {
    logger.add(logger.transports.Console);
}
module.exports = logger;