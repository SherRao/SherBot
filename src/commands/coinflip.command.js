const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const coinflipEmbed = require("../embeds/coinflip.embed");

/**
 *
 * Command that lets you flip a coin for either heads or tails.
 *
 * @author Nausher Rao
 *
 */
function execute(interaction) {
    if (Math.random() < .5)
        coinflipEmbed.embed.description = "**You got tails!**";

    util.sendEmbed(coinflipEmbed.embed, interaction);
}

const data = {
    name: "coinflip",
    description: "Flip a coin? duh???",
    default_permission: true,
};

module.exports = { data: data, execute: execute, enabled: true };