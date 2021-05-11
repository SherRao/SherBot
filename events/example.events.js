const util = require('../util');
const main = require('../index');
const discord = main.discord;
const logger = main.logger;

/**
 * 
 * Example command that prints a ready message when the bot turns on.
 * 
 */
module.exports = {

    name: "ready",
    
    once: true,

    execute: () => {
        logger.info(`Ready! Logged in as ${discord.user.tag}!`);

    }

}