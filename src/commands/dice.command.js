const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const diceEmbed = require("../embeds/dice.embed");

/**
 *
 * Command that lets a roll a dice to roll a random number between 1 -> n.
 * The default value for n is 6, but can be given by the user.
 *
 * @author Nausher Rao
 *
 */
function execute(interaction) {
    let n = interaction.data.options ? interaction.data.options[0].value : 6;
    let result = Math.floor(Math.random() * n) + 1;

    diceEmbed.embed.description = `**You rolled a ${result}!**`;
    util.sendEmbed(diceEmbed.embed, interaction);
}

const data = {
    name: "diceroll",
    description: "Roll a dice? duh???",
    default_permission: true,
    options: [
        {
            name: "n",
            description: "The sides of the dice. Default is 6.",
            type: 4,
        },
    ],
};

module.exports = { data: data, execute: execute, enabled: true };