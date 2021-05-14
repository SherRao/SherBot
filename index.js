const fs = require('fs');
const config = require('./config.json');

const Discord = require('discord.js');
const discord = new Discord.Client();
const logger = require('js-logger');

let commands = [];  
let events = [];
let tasks = [];

/**
 * 
 * Allows any other file that has access to index to use other files.
 * 
 * @author Nausher Rao
 * 
 */
module.exports = {
    "discord": discord,
    "logger": logger,

}


/**
 * 
 * Main function that handles all calls to other parts of the bot.
 * 
 * @author Nausher Rao
 * 
 */
function main() {
    discord.once('ready', () => {

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
 * This should be changed to your liking.
 * 
 * @author Nausher Rao
 * 
 */
function initLogger() {
    logger.useDefaults({
        defaultLevel: logger.DEBUG,
        
        formatter: function (messages, context) {
            messages.unshift(`[${new Date().toUTCString()}] [${context.level.name}]: `)
       
        }
    });
}

/**
 * 
 * Sets the initial Discord bot user presence text. 
 * This should be changed to your liking.
 * 
 * @author Nausher Rao
 *
 */
function setPresence() {
    logger.info("Setting presence!");
    discord.user.setPresence({
        status: "dnd",
        activity: {
            name: "Loading bot...", 
            type: "WATCHING",
            url: null
        },     

    type: "WATCHING" });
}

/**
 * 
 * Load all command files from the "commands" folder, and POST them to the Discord 
 * command endpoint for the specific server.
 * 
 * @author Nausher Rao
 * 
 */
function registerCommands() {
    logger.info("Loading commands!");
    let files = fs.readdirSync('./commands')
                    .filter(file => file.endsWith('.js') && file != 'example.command.js')
    
    for(const file of files) {
        const command = require(`./commands/${file}`);
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
 * @author Nausher Rao
 * 
 */
function registerEvents() {
    logger.info("Loading event handlers!");
    let files = fs.readdirSync('./events')
                    .filter(file => file.endsWith('.js') && file != 'example.event.js');

    for(const file of files) {
        const event = require(`./events/${file}`);
        events.push(event);
        
        if(event.once)
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
 * @author Nausher Rao
 * 
 */
 function registerTasks() {
    logger.info("Loading tasks!");
    let files = fs.readdirSync('./tasks')
                    .filter(file => file.endsWith('.js') && file != 'example.task.js');

    for(const file of files) {
        const task = require(`./tasks/${file}`);
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
 * @author Nausher Rao
 * 
 */
function handleCommands() {
    logger.info("Registering commands with the interaction create web socket!");
    discord.ws.on('INTERACTION_CREATE', async interaction => {
        const input = interaction.data.name.toLowerCase();
        for(const command of commands) {
            if(command.data.name == input) {
                logger.debug("Processing command: " + command.data.name);
                command.execute(interaction);
                break;

            } else
                continue;
    
        }
    });
}

main();