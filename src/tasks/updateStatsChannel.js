const util = require("../util");
const main = require("../index");
const config = require("../config.js");
const discord = main.discord;
const logger = main.logger;

async function execute() {
    const server = discord.guilds.cache.get(config.server);
    const members = server.members.cache;

    let total = members.size;
    let online = members.filter(member => member.presence.status === "online").size;
    let listening = members.filter(member => member.presence.activities.length > 0 && member.presence.activities[0].type === "LISTENING").size;
    let gaming = members.filter(member => member.presence.activities.length > 0 && member.presence.activities[0].type === "PLAYING").size;

    const membersChannel = await discord.channels.fetch(config.channelIds.statistics.members);
    membersChannel.setName(`👥 Members: ${total}`);

    const onlineChannel = await discord.channels.fetch(config.channelIds.statistics.online);
    onlineChannel.setName(`🟢 Online: ${online}`);

    const musicChannel = await discord.channels.fetch(config.channelIds.statistics.music);
    musicChannel.setName(`🎵 Jamming Out: ${listening}`);

    const gamingChannel = await discord.channels.fetch(config.channelIds.statistics.gaming);
    gamingChannel.setName(`🎮 Gaming: ${gaming}`);

    logger.debug("Updated statistics channels");
}

module.exports = { interval: 1000 * 20, execute: execute, enabled: false };