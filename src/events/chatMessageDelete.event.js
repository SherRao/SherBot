const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config.js");
const logEmbed = require("../embeds/userLog.embed");

/**
 * 
 * 
 */
async function execute(message) {
    if (message.system || message.guild == null || message.member == null || message.member.user.id == discord.user.id)
        return;

    logRegularActivity(message);
}

async function logRegularActivity(message) {
    const embed = getLogEmbed(message);
    const globalChannelLog = await discord.channels.fetch(config.channelIds.globalLog);
    const messageChannelLog = await discord.channels.fetch(config.channelIds.messageEditLog);

    await globalChannelLog.send({ embed: embed });
    await messageChannelLog.send({ embed: embed });

    logger.debug("Logged message delete!");
}

function getLogEmbed(message) {
    const member = message.member;
    const user = member.user;

    let embed = logEmbed.embed;
    embed.title = "Message Deleted";
    embed.description = `**Deleted:** ${message.content}`;
    embed.url = message.url;
    embed.footer.text = `Message ID: ${message.id}`;
    embed.author.name = `${user.username}#${user.discriminator} // "${member.displayName}"`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

module.exports = { name: "messageDelete", once: false, execute: execute, enabled: true };