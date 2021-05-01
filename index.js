const fs = require('fs');
const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
const logger = require('js-logger');

let commands = [];  
let events = [];
let tasks = [];

/**
 * 
 * Main function that handles all calls to other parts of the bot.
 * 
 * @author Nausher Rao
 * 
 */
function main() {
    client.once('ready', () => {

        initLogger();
        setPresence();
        registerCommands();
        registerEvents();
        registerTasks();
        handleCommands();

        logger.info("Bot loaded!");
    });

    client.login(config.token);
}


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
    client.user.setPresence({
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
                    .filter(file => file.endsWith('.js') && file != 'example.js')
    
    for(const file of files) {
        const command = require(`./commands/${file}`);
        commands.push(command);
        client.api.applications(client.user.id).guilds(config.server).commands.post(command);
        
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
                    .filter(file => file.endsWith('.js') && file != 'example.js');

    for(const file of files) {
        const event = require(`./events/${file}`);
        events.push(event);
        
        if(event.once)
		    client.once(event.name, (...args) => event.execute(client, logger, ...args));

        else 
            client.on(event.name, (...args) => event.execute(client, logger, ...args));
        
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
                    .filter(file => file.endsWith('.js') && file != 'example.js');

    for(const file of files) {
        const task = require(`./tasks/${file}`);
        tasks.push(task);
        setInterval(task.execute, task.interval, client, logger);

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
    client.ws.on('INTERACTION_CREATE', async interaction => {
        const input = interaction.data.name.toLowerCase();
        for(const command of commands) {
            if(command.data.name == input) {
                logger.info("Processing command: " + command.data.name);
                command.execute(client, logger, interaction);
                break;

            } else
                continue;
    
        }
    });
}

main();