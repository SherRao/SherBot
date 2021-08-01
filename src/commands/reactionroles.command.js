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
        if (type == "schools") {
            util.sendMessage("Adding all emojis to the schools reaction role messages!", interaction);

            const schoolChannelId = config.channelIds.reactionRoles.schools;
            const schoolChannel = await discord.channels.fetch(schoolChannelId);

            const schoolMessage = (await schoolChannel.messages.fetch({ limit: 1 })).first();
            const schoolEmojis = Object.keys(config.roleIds.reactionRoles.schools);

            for (const emoji of schoolEmojis)
                await schoolMessage.react(emoji);

        } else if (type == "interests") {
            util.sendMessage("Adding all emojis to the interests reaction role messages!", interaction);

            const interestChannelId = config.channelIds.reactionRoles.interests;
            const interestChannel = await discord.channels.fetch(interestChannelId);

            const interestMessage = (await interestChannel.messages.fetch({ limit: 1 })).first();
            const interestEmojis = Object.keys(config.roleIds.reactionRoles.interests);

            for (const emoji of interestEmojis)
                await interestMessage.react(emoji);

        } else if (type == "genders") {
            util.sendMessage("Adding all emojis to the pronouns reaction role messages!", interaction);
            const genderChannelId = config.channelIds.reactionRoles.gender;
            const genderChannel = await discord.channels.fetch(genderChannelId);

            const genderMessage = (await genderChannel.messages.fetch({ limit: 1 })).first();
            const genderEmojis = Object.keys(config.roleIds.reactionRoles.genders);

            for (const emoji of genderEmojis)
                await genderMessage.react(emoji);

        } else
            util.sendMessage("That isn't a valid reaction role type!", interaction);

    } else
        util.sendMessage("You aren't a moderator! 😠", interaction);
}

const data = {
    name: "rr",
    description: "Lets an admin repopulate reaction roles.",
    default_permission: true,

    options: [
        {
            name: "type",
            description: "Which of the reaction roles messages to target.",
            required: true,
            type: 3,
        }
    ]
};

module.exports = { data: data, execute: execute, enabled: true };