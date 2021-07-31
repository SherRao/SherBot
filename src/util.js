const bot = require("./index");

/**
 *
 * Respond to a slash command interaction via a message in the same channel
 * the command originated in.
 *
 * @param {string} message The message to send to the channel.
 * @param {any} interaction The interaction data to respond to.
 * @author Nausher Rao
 * 
 */
function sendMessage(message, interaction) {
    bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
        data: { type: 4, data: { content: message } },

    });
}

/**
 *
 * Respond to a slash command interaction via an embed in the same channel
 * the command originated in.
 *
 * @param {any} embed The embed to send to the channel.
 * @param {any} interaction The interaction data to respond to.
 * @author Nausher Rao
 * 
 */
function sendEmbed(embed, interaction) {
    bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
        data: { type: 4, data: { embeds: [embed] } },

    });
}

module.exports = { sendMessage, sendEmbed };