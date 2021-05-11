const bot = require('./index');

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
            data: { type: 4, data: {content: message} }

        });
    }

}