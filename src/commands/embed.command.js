const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config");
const rulesEmbed = require("../embeds/rules.embed");
const welcomeEmbed = require("../embeds/welcome.embed");
const welcomeDMEmbed = require("../embeds/welcomeDM.embed");

const genderEmbed = require("../embeds/pronounsReactionRole.embed");
const interestsEmbed = require("../embeds/interestsReactionRole.embed");
const schoolsEmbed = require("../embeds/schoolsReactionRole.embed");

/**
 *
 * Command that lets a moderator send the welcome, rules, or any of the 3
 * reaction role embeds to their specific channels.
 *
 * @author Nausher Rao
 *
 */
async function execute(interaction) {
    const serverId = interaction.guild_id;
    const server = await discord.guilds.fetch(serverId);

    const memberId = interaction.member.user.id;
    const member = await server.members.fetch(memberId);

    const memberRoles = [];
    member.roles.cache.each(role => memberRoles.push(role.id));

    const isAdmin = memberRoles.includes(config.roleIds.moderator);
    if (isAdmin) {
        const type = interaction.data.options[0].value;
        if (type == "rules") {
            const rulesChannelId = config.channelIds.rules;
            const rulesChannel = await discord.channels.fetch(rulesChannelId);
            await rulesChannel.send({ embed: rulesEmbed.embed });
            util.sendMessage("Sent the rules embed in its channel!", interaction);

        } else if (type == "welcome") {
            const welcomeChannelId = config.channelIds.welcome;
            const welcomeChannel = await discord.channels.fetch(welcomeChannelId);
            await welcomeChannel.send({ embed: welcomeEmbed.embed });
            util.sendMessage("Sent the welcome embed in its channel!", interaction);

        } else if (type == "gender") {
            const fields = [];
            for (const [emoji, roleId] of Object.entries(config.roleIds.reactionRoles.genders)) {
                const role = await server.roles.fetch(roleId);
                fields.push({ name: role.name, value: emoji, inline: true });
            }

            const embed = genderEmbed.embed;
            embed.fields = fields;

            const genderChannelId = config.channelIds.reactionRoles.gender;
            const genderChannel = await discord.channels.fetch(genderChannelId);
            await genderChannel.send({ embed: embed });
            util.sendMessage("Sent the pronouns reaction role embed in its channel!", interaction);

        } else if (type == "interests") {
            const fields = [];
            for (const [emoji, roleId] of Object.entries(config.roleIds.reactionRoles.interests)) {
                const role = await server.roles.fetch(roleId);
                fields.push({ name: `${emoji}    ${role.name}`, value: "\u200B", inline: false });
            }

            const embed = interestsEmbed.embed;
            embed.fields = fields;

            const interestsChannelId = config.channelIds.reactionRoles.interests;
            const interestsChannel = await discord.channels.fetch(interestsChannelId);
            await interestsChannel.send({ embed: embed });
            util.sendMessage("Sent the interests reaction role embed in its channel!", interaction);

        } else if (type == "schools") {
            const fields = [];
            for (const [emoji, roleId] of Object.entries(config.roleIds.reactionRoles.schools)) {
                const role = await server.roles.fetch(roleId);
                fields.push({ name: `${emoji}    ${role.name}`, value: "\u200B", inline: false });
            }

            const embed = schoolsEmbed.embed;
            embed.fields = fields;

            const schoolsChannelId = config.channelIds.reactionRoles.schools;
            const schoolsChannel = await discord.channels.fetch(schoolsChannelId);
            await schoolsChannel.send({ embed: embed });
            util.sendMessage("Sent the schools reaction role embed in its channel!", interaction);

        } else if (type == "welcomeDM") {
            await member.send({ embed: welcomeDMEmbed.embed });
            util.sendMessage("Sent the welcome embed DM to you!", interaction);

        } else
            util.sendMessage("That isn't a valid embed type!", interaction);

    } else
        util.sendMessage("You aren't a moderator! 😠", interaction);
}

const data = {
    name: "embed",
    description: "Lets an admin post an embed in a channel.",
    default_permission: true,
    options: [
        {
            name: "type",
            description: "The type of embed to post.",
            required: true,
            type: 3,
        }
    ]
};

module.exports = { data: data, execute: execute, enabled: true };