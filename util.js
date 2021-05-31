const bot = require("./index");

module.exports = {
    /**
     *
     * Respond to a slash command interaction via a message in the same channel
     * the command originated in.
     *
     * @param {string} message The message to send to the channel.
     * @param {any} interaction The interaction data to respond to.
     */
    sendMessage: (message, interaction) => {
        bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
            data: { type: 4, data: { content: message } },
        });
    },

    /**
     *
     * Respond to a slash command interaction via an embed in the same channel
     * the command originated in.
     *
     * @param {any} embed The embed to send to the channel.
     * @param {any} interaction The interaction data to respond to.
     */
    sendEmbed: async (embed, interaction) => {
        await bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
            data: { type: 4, data: { embeds: [embed] } },
        });
    },

    /**
     *
     * Respond to a slash command interaction via a message an embed in the same channel
     * the command originated in.
     *
     * @param {string} message The message to send to the channel.
     * @param {any} embed The embed to send to the channel.
     * @param {any} interaction The interaction data to respond to.
     */
    sendMessageEmbed: async (message, embed, interaction) => {
        await bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
            data: { type: 4, data: { content: message, embeds: [embed] } },
        });
    },
};
