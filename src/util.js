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

/**
 * 
 * Lets you write a one-liner to resolve a Promise and 
 * catch any errors thrown.
 * 
 * @example const [result, error] = await resolve(promise);
 * if(error) console.log("An error was thrown!", error); 
 * else console.log("The result of the promise is:", result);
 * 
 * @param {Promise} promise The promise to wait for.
 * @returns {Error?} The error if one was thrown. 
 * @returns  {Promise?} The promise if one was resolved.
 * 
 * @author Nausher Rao
 * 
 */
async function resolve(promise) {
    try {
        let result = await promise;
        return [result, null];

    } catch (err) { return [err, null]; }
}

module.exports = { sendMessage, sendEmbed, resolve };