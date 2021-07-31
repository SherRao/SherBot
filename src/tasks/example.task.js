const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

/**
 * 
 * A task is executed on a regular basis by the JavaScript scheduler.
 * The interval is given in milliseconds.
 * 
 * @see https://www.w3schools.com/jsref/met_win_setinterval.asp
 * @author Nausher Rao
 * 
 */
async function execute() {
    console.log(`The time is currently: ${new Date().toLocaleString()}! for ${discord.user.tag}`);

}

module.exports = { execute: execute, interval: 1000 * 60 };