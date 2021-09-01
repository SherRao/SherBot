const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const config = require("../config.js");

/**
 *
 * Grants people roles on a reaction role message.
 *
 * @author Nausher Rao
 *
 */
async function execute(reaction, user) {
    if (user.bot)
        return;

    let message = reaction.message;
    let server = message.guild;
    let emoji_id = reaction.emoji.name;

    const latestInterestMessage = await getLatestMessage(config.channelIds.reactionRoles.interests);
    const latestSchoolMessage = await getLatestMessage(config.channelIds.reactionRoles.schools);
    const latestGenderMessage = await getLatestMessage(config.channelIds.reactionRoles.gender);

    if (message.id == latestInterestMessage.id) {
        const roleId = config.roleIds.reactionRoles.interests[emoji_id];
        if (!roleId)
            return;

        const headerId = config.roleIds.reactionRoles.headers.interests;
        const member = await server.members.fetch(user.id);
        await member.roles.add([roleId, headerId]);
        logger.debug("Given role for interests reaction role!");

    } else if (message.id == latestSchoolMessage.id) {
        const roleId = config.roleIds.reactionRoles.schools[emoji_id];
        if (!roleId)
            return;

        const member = await server.members.fetch(user.id);
        await member.roles.add(roleId);
        logger.debug("Given role for schools reaction role!");

    } else if (message.id == latestGenderMessage.id) {
        const roleId = config.roleIds.reactionRoles.genders[emoji_id];
        if (!roleId)
            return;

        const member = await server.members.fetch(user.id);
        await member.roles.add(roleId);
        logger.debug("Given role for gender reaction role!");
    }
}

async function getLatestMessage(channelId) {
    const channel = await discord.channels.fetch(channelId);
    return (await channel.messages.fetch({ limit: 1 })).first();

}

module.exports = { name: "messageReactionAdd", once: false, execute: execute, enabled: true };