const fs = require("fs");
const config = require("./config");

const Discord = require("discord.js-light");
const discord = new Discord.Client({

    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: false,
    cachePresences: true,

});

const logger = require("js-logger");

/** Stores all the command files that are registered by the program. */
let commands = [];

/** Stores all the event files that are registered by the program. */
let events = [];

/** Stores all the task files that are registered by the program. */
let tasks = [];

/** Stores all the job files that are registered by the program. */
let jobs = [];

/**
 * 
 * Main function that handles all calls to other parts of the bot.
 * 
 * This function does not need to be edited.
 * @author Nausher Rao
 * 
 */
function main() {
    discord.once("ready", () => {
        initLogger();
        setPresence();
        registerCommands();
        registerEvents();
        registerTasks();
        handleCommands();

        logger.info("Bot loaded!");
    });

    discord.login(config.token);
}


/**
 * 
 * Sets up the logger to look pretty. 
 * 
 * This function should be changed to your liking.
 * @author Nausher Rao
 * 
 */
function initLogger() {
    logger.useDefaults({
        defaultLevel: logger.DEBUG,

        formatter: function (messages, context) {
            messages.unshift(`[${new Date().toUTCString()}] [${context.level.name}]: `);

        }
    });
}

/**
 * 
 * Sets the initial Discord bot user presence text. 
 * 
 * This function should be changed to your liking.
 * @author Nausher Rao
 *
 */
function setPresence() {
    logger.info("Setting presence!");
    discord.user.setPresence({
        status: "dnd",
        activity: {
            name: "www.ccubed.dev",
            type: "STREAMING",
            url: "https://www.twitch.tv/ccubed_dev"
        },

        type: "STREAMING"
    });
}

/**
 * 
 * Load all command files from the "commands" folder, and POST them to the Discord 
 * command endpoint for the specific server.
 * 
 * This function does not need to be edited.
 * @private
 * @author Nausher Rao
 * 
 */
function registerCommands() {
    logger.info("Loading commands!");
    let files = fs.readdirSync("./commands")
        .filter(file => file.endsWith(".js") && file != "example.command.js");

    for (const file of files) {
        const command = require(`./commands/${file}`);
        if (!command.enabled)
            continue;

        commands.push(command);
        discord.api.applications(discord.user.id).guilds(config.server).commands.post(command);
        logger.info(`Loaded command from file: commands/${file}`);
    }
}

/**
 * 
 * Load all event handler files from the "events" folder, and registers them 
 * with the Discord event manager.
 * 
 * This function does not need to be edited.
 * @private
 * @author Nausher Rao
 * 
 */
function registerEvents() {
    logger.info("Loading event handlers!");
    let files = fs.readdirSync("./events")
        .filter(file => file.endsWith(".js") && file != "example.event.js");

    for (const file of files) {
        const event = require(`./events/${file}`);
        if (!event.enabled)
            continue;

        events.push(event);
        if (event.once)
            discord.once(event.name, (...args) => event.execute(...args));

        else
            discord.on(event.name, (...args) => event.execute(...args));
        logger.info(`Loaded event handler from file: events/${file}`);
    }
}

/**
 * 
 * Load all repeating task files from the "tasks" folder, and registers them 
 * with the JS Window DOM.
 * 
 * This function does not need to be edited.
 * @private
 * @author Nausher Rao
 * 
 */
function registerTasks() {
    logger.info("Loading tasks!");
    let files = fs.readdirSync("./tasks")
        .filter(file => file.endsWith(".js") && file != "example.task.js");

    for (const file of files) {
        const task = require(`./tasks/${file}`);
        if (!task.enabled)
            continue;

        tasks.push(task);
        setInterval(task.execute, task.interval);
        logger.info(`Loaded task from file: tasks/${file}`);
    }
}

/**
 * 
 * Code registered directly with the web socket to execute code 
 * when a slash command ("interaction") is recorded. 
 * 
 * This function does not need to be edited.
 * @private
 * @author Nausher Rao
 * 
 */
function handleCommands() {
    logger.info("Registering commands with the interaction create web socket!");
    discord.ws.on("INTERACTION_CREATE", async interaction => {
        const input = interaction.data.name.toLowerCase();
        for (const command of commands) {
            if (command.data.name == input) {
                logger.debug("Processing command: " + command.data.name);
                command.execute(interaction);
                break;

            } else
                continue;
        }
    });
}

/**
 * 
 * Allows any other file that has access to index to use other files.
 * @author Nausher Rao
 * 
 */
module.exports = { discord: discord, logger: logger };

main();
