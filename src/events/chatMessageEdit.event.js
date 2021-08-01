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
async function execute(oldMessage, newMessage) {
    if (newMessage.member.user.id == discord.user.id)
        return;

    logRegularActivity(oldMessage, newMessage);
}

async function logRegularActivity(oldMessage, newMessage) {
    const embed = getLogEmbed(oldMessage, newMessage);
    const globalChannelLog = await discord.channels.fetch(config.channelIds.globalLog);
    const messageChannelLog = await discord.channels.fetch(config.channelIds.messageEditLog);

    await globalChannelLog.send({ embed: embed });
    await messageChannelLog.send({ embed: embed });

    logger.debug("Logged message edit!");
}

function getLogEmbed(oldMessage, newMessage) {
    const member = newMessage.member;
    const user = member.user;

    let embed = logEmbed.embed;
    embed.title = "Message Edited";
    embed.description = `**Old:** ${oldMessage.content}\n**New:** ${newMessage.content}`;
    embed.url = newMessage.url;
    embed.footer.text = `Message ID: ${newMessage.id}`;
    embed.author.name = `${user.username}#${user.discriminator} // "${member.displayName}"`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

module.exports = { name: "messageUpdate", once: false, execute: execute, enabled: true };