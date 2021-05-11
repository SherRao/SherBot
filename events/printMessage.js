const util = require('../util');
const main = require('../index');
const discord = main.discord;
const logger = main.logger;

/**
 * 
 * Example event that logs a debug message everytime a messsage
 * is sent.
 * 
 */
module.exports = {

    name: "message",
    
    once: false,

    execute: (message) => {
        logger.debug(`Someone said: "${message.content}"`);

    }

}