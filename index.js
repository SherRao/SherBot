const fs = require('fs');
const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
const logger = require('js-logger');

let commands = [];  
let events = [];

/**
 * 
 * Main function that handles all calls to other parts of the bot.
 * 
 * @author Nausher Rao
 * 
 */
function main() {
    client.once('ready', () => {
        logger.useDefaults();

        setPresence();
        registerCommands();
        registerEvents();
        handleCommands();

        console.log("Bot loaded!");
    });

    client.login(config.token);
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
    console.log("Loading commands!");
    let files = fs.readdirSync('./commands')
                    .filter(file => file.endsWith('.js') && file != 'example.js')

    for(const file of files) {
        const command = require(`./commands/${file}`);
        commands.push(command);
        client.api.applications(client.user.id).guilds(config.server).commands.post(command);
        
        console.log(`Loaded command from file: ./commands/${file}`);
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
    console.log("Loading event handlers!");
    let files = fs.readdirSync('./events')
                    .filter(file => file.endsWith('.js') && file != 'example.js');

    for(const file of files) {
        const event = require(`./events/${file}`);
        events.push(event);

        if(event.once)
            client.once(event.name, client.execute(client));

        else 
            client.on(event.name, event.execute(client))
        
        console.log(`Loaded event handler from file: ./events/${file}`);
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
    console.log("Registering commands with the interaction create web socket!");
    client.ws.on('INTERACTION_CREATE', async interaction => {
        const input = interaction.data.name.toLowerCase();
        for(const command of commands) {
            if(command.data.name == input) {
                console.log("Processing command: " + command.data.name);
                command.execute(client, interaction);
                break;

            } else
                continue;
    
        }
    });
}

main();