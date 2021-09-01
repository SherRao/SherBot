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
async function execute(oldMember, newMember) {
    if (!oldMember || !newMember || oldMember.nickname === newMember.nickname)
        return;

    const embed = getLogEmbed(oldMember, newMember);
    const globalChannelLog = await discord.channels.fetch(config.channelIds.globalLog);
    const memberChannelLog = await discord.channels.fetch(config.channelIds.memberLog);

    await globalChannelLog.send({ embed: embed });
    await memberChannelLog.send({ embed: embed });
    logger.debug("Logged member nickname change!");
}

function getLogEmbed(oldMember, newMember) {
    const user = newMember.user;
    let embed = logEmbed.embed;

    embed.title = "Nickname Change";
    embed.description = `**Old:** ${oldMember.nickname}\n**New:** ${newMember.nickname}`;
    embed.footer.text = `Member ID: ${newMember.id}`;
    embed.author.name = `${user.username}#${user.discriminator}`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

module.exports = { name: "guildMemberUpdate", once: false, execute: execute, enabled: true };