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

    if (message.channel.parentID == config.categoryIds.important || message.channel.type == "news")
        reactToAnnouncementMessage(message);

    logRegularActivity(message);
}

async function logRegularActivity(message) {
    const embed = getLogEmbed(message);
    const globalChannelLog = await discord.channels.fetch(config.channelIds.globalLog);
    const messageChannelLog = await discord.channels.fetch(config.channelIds.messageSendLog);

    await globalChannelLog.send({ embed: embed });
    await messageChannelLog.send({ embed: embed });

    logger.debug("Logged message send!");
}

async function reactToAnnouncementMessage(message) {
    for (const emoji of config.reactionEmojiIds)
        await message.react(emoji);

    logger.debug("Added reaction to announcement message!");
}

function getLogEmbed(message) {
    const member = message.member;
    const user = member.user;

    let embed = logEmbed.embed;
    embed.title = "Message Sent";
    embed.description = `**Sent:** ${message.content}`;
    embed.url = message.url;
    embed.footer.text = `Message ID: ${message.id}`;
    embed.author.name = `${user.username}#${user.discriminator} // "${member.displayName}"`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

module.exports = { name: "message", once: false, execute: execute, enabled: true };