const util = require('../util');
const main = require('../index');
const discord = main.discord;
const logger = main.logger;

module.exports = {

    // How long to wait in between calls to this tasks execute(), in milliseconds.
    interval: 1000 * 60,

    execute: () =>{
        console.log(`The time is currently: ${new Date().toLocaleString()}! for ${discord.user.tag}`);

    }

}