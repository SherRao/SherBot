const fs = require('fs');
const config = require('./config.json');

const discordAdmin = require('discord.js');
const discord = new discordAdmin.Client();

let commands = [];  

/**
 * 
 * Main function that handles all calls to other parts of the bot.
 * 
 * @author Nausher Rao
 * 
 */
function main() {
    discord.once('ready', () => {
        setPresence();
        initCommands();
        handleCommands();

        console.log("Bot loaded!");
    });

    discord.login(config.token);
}

/**
 * 
 * Sets the initial Discord bot user presence text.
 * 
 * @author Nausher Rao
 *
 */
function setPresence() {
    discord.user.setPresence({
        status: "dnd",
        activity: {
            name: "Loading bot...", 
            type: "WATCHING"
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
function initCommands() {
    console.log("Loading commands!");
    for(const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file != 'template.js') ) {
        const command = require(`./commands/${file}`);

        discord.api.applications(discord.user.id).guilds(config.server).commands.post(command);
        commands.push(command);
        
        console.log(`Loaded command from file: ./commands/${file}`);
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
    console.log("Registering command interaction create listener!");
    discord.ws.on('INTERACTION_CREATE', async interaction => {
        const input = interaction.data.name.toLowerCase();
        
        const user = null//;
        const userPermissions = interaction.;
        const userRoles = interaciton;

        for(const command of commands) {
            if(command.data.name == input) {
                let permissionsRoles = command.permission_roles;
                let permissions = command.permission;
                if(permissions != null && permissions.includes())

                console.log("Processing command: " + command);
                command.execute(client, interaction);
                break;

            } else
                continue;
    
        }
    });
}

main();