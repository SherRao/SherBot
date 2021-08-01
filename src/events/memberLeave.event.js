const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config.js");
const logEmbed = require("../embeds/userLog.embed");

/**
 *
 * Logs when a user leaves the server.
 * 
 * @author Nausher Rao
 *
 */
async function execute(member) {
    const embed = getLogEmbed(member);
    const globalChannelLog = await discord.channels.fetch(config.channelIds.globalLog);
    const memberChannelLog = await discord.channels.fetch(config.channelIds.memberLog);

    await globalChannelLog.send({ embed: embed });
    await memberChannelLog.send({ embed: embed });
    logger.debug("Logged member leave!");

}

function getLogEmbed(member) {
    const user = member.user;
    let embed = logEmbed.embed;

    embed.title = "Member Leave";
    embed.url = `https://discord.com/users/${member.id}`;
    embed.description = "";
    embed.footer.text = `Member ID: ${member.id}`;
    embed.author.name = `${user.username}#${user.discriminator}`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

module.exports = { name: "guildMemberRemove", once: false, execute: execute, enabled: true };