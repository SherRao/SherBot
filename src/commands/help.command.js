const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config.js");
const helpEmbed = require("../embeds/help.embed");

/**
 * 
 * Command that lets a use ask the moderator team for 
 * help with a custom message.
 * 
 * @author Nausher Rao
 * 
 */
async function execute(interaction) {
    const message = interaction.data.options[0].value;

    const serverId = interaction.guild_id;
    const server = await discord.guilds.fetch(serverId);
    const memberId = interaction.member.user.id;
    const member = await server.members.fetch(memberId);

    const embed = getHelpEmbed(member, message);
    const helpChannel = await discord.channels.fetch(config.channelIds.help);
    await helpChannel.send({ content: "<@816336112359833621>", embed: embed });

    util.sendMessage("A moderator will be in contact with you shortly!", interaction);

}

function getHelpEmbed(member, message) {
    const user = member.user;

    let embed = helpEmbed.embed;
    embed.description = `"${message}"`;
    embed.url = `https://discord.com/users/${member.id}`;
    embed.footer.text = `User ID: ${member.id}`;
    embed.author.name = `${user.username}#${user.discriminator} // "${member.displayName}"`;
    embed.author.icon_url = `${user.displayAvatarURL()}`;
    embed.thumbnail.url = `${user.displayAvatarURL()}`;

    return embed;
}

const data = {
    name: "help",
    description: "Send a message to a moderator about needing assistance.",
    default_permission: true,
    options: [
        {
            name: "message",
            description: "The message to send to a moderator.",
            type: 3,
            required: true,
        },
    ],
};

module.exports = { data: data, execute: execute, enabled: true };