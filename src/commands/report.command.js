const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config.js");
const reportEmbed = require("../embeds/report.embed");

/**
 * Command that lets a use report a specific user to the
 * moderator team to be reviewed.
 * 
 * @author Nausher Rao
 * 
 */
async function execute(interaction) {
    const message = interaction.data.options[1].value;
    const targetMemberId = interaction.data.options[0].value;
    const serverId = interaction.guild_id;
    const memberId = interaction.member.user.id;

    const server = await discord.guilds.fetch(serverId);
    const member = await server.members.fetch(memberId);
    const targetMember = await server.members.fetch(targetMemberId);

    const embed = getReportEmbed(targetMember, member, message);
    const reportChannel = await discord.channels.fetch(config.channelIds.report);
    await reportChannel.send({ content: "<@816336112359833621>", embed: embed });

    util.sendMessage("A moderator will be in contact with you shortly!", interaction);

}

function getReportEmbed(targetMember, member, message) {
    const user = member.user;
    const targetUser = targetMember.user;

    let embed = reportEmbed.embed;
    embed.description = `**Reported:** ${targetUser.username}#${targetUser.discriminator}\n**Message:** ${message}`;
    embed.url = `https://discord.com/users/${member.id}`;
    embed.footer.text = `User ID: ${member.id}`;
    embed.author.name = `${user.username}#${user.discriminator} -> ${targetUser.username}#${targetUser.discriminator}`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

const data = {
    name: "report",
    description: "Report a specified user to a moderator about them breaking the rules.",
    default_permission: true,
    options: [
        {
            name: "target",
            description: "The target user to report.",
            type: 6,
            required: true,
        },

        {
            name: "message",
            description: "What the user did. This can be a long message.",
            type: 3,
            required: true
        },

    ],
};

module.exports = { data: data, execute: execute, enabled: true };