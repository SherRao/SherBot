const bot = require("./index");

/**
 *
 * Respond to a slash command interaction via a message in the same channel
 * the command originated in.
 *
 * @param {string} message The message to send to the channel.
 * @param {any} interaction The interaction data to respond to.
 * @author Nausher Rao
 * 
 */
function sendMessage(message, interaction) {
    bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
        data: { type: 4, data: { content: message } },

    });
}

/**
 *
 * Respond to a slash command interaction via an embed in the same channel
 * the command originated in.
 *
 * @param {any} embed The embed to send to the channel.
 * @param {any} interaction The interaction data to respond to.
 * @author Nausher Rao
 * 
 */
function sendEmbed(embed, interaction) {
    bot.discord.api.interactions(interaction.id, interaction.token).callback.post({
        data: { type: 4, data: { embeds: [embed] } },

    });
}

/**
 * 
 * Check whether or not a specific member of a server has a specific
 * role.
 * 
 * @param {GuildMember} member The member to check the roles of.
 * @param {String} roleId The ID of the role to check for.
 * @returns Whether or not the member has the role.
 * 
 * @author Nausher Rao
 * 
 */
function hasRole(member, roleId) {
    return member.roles.cache.some(role => role.id == roleId);

}

/**
 * 
 * Check whether or not a specific member of a server has any
 * of the specified roles.
 * 
 * @param {GuildMember} member The member to check the roles of.
 * @param {...String} roleIds The IDs of the roles to check for.
 * @returns Whether or not the member has any of the roles.
 * 
 * @author Nausher Rao
 * 
 */
function hasAnyRoles(member, ...roleIds) {
    throw "Not implemented yet!";
    // return member.roles.cache.some(role => roleIds.includes(role.id));
}

/**
 * 
 * Check whether or not a specific member of a server has all
 * of the specified roles.
 * 
 * @param {GuildMember} member The member to check the roles of.
 * @param {...String} roleIds The IDs of the roles to check for.
 * @returns Whether or not the member has all of the roles.
 * 
 * @author Nausher Rao
 * 
 */
function hasAllRoles(member, ...roleIds) {
    throw "Not implemented yet!";
    // return member.roles.cache.every(role => roleIds.includes(role.id));
}

/**
 * 
 * Check whether or not a specific member of a server has a specific 
 * permission.
 * 
 * @param {GuildMember} member The member to check the permissions of.
 * @param {Permissions.FLAGS} permission The permission to check for.
 * @returns Whether or not the member has the permission.
 * 
 * @author Nausher Rao
 * 
 */
function hasPermission(member, permission) {
    return member.permissions.has(permission);

}

/**
 *
 * Check whether or not a specific member of a server has any 
 * of the specified permissions.
 *
 * @param {GuildMember} member The member to check the permissions of.
 * @param {...Permissions.FLAGS} permissions The permissions to check for.
 * @returns Whether or not the member has any of the permission.
 *
 * @author Nausher Rao
 *
 */
function hasAnyPermissions(member, ...permissions) {
    throw "Not implemented yet!";
    //return member.permissions.has(permissions);
}

/**
 *
 * Check whether or not a specific member of a server has all
 * of the specified permissions.
 *
 * @param {GuildMember} member The member to check the permissions of.
 * @param {...Permissions.FLAGS} permissions The permissions to check for.
 * @returns Whether or not the member has all of the permission.
 *
 * @author Nausher Rao
 *
 */
function hasAllPermissions(member, ...permissions) {
    throw "Not implemented yet!";
}


module.exports = { sendMessage, sendEmbed, hasRole, hasAnyRole, hasAllRoles, hasPermission, hasAnyPermissions, hasAllPermissions };