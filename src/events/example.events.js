const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

/**
 *
 * Example command that prints a ready message when the bot turns on.
 *
 * @see https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
 * @author Nausher Rao
 * 
 */
function execute() {
    logger.info(`Ready! Logged in as ${discord.user.tag}!`);
}

module.exports = { execute: execute, name: "ready", once: true, enabled: true };
