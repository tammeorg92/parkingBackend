const logger = require('winston'),
    fs = require('fs');

const LOG_DIR = './logs';

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

logger.clear();

logger.cli();

logger.add(logger.transports.File,
    { filename: './logs/error.log', level: 'error' });

if (process.env.NODE_ENV !== 'test') {
    logger.add(logger.transports.Console);
}
module.exports = logger;