const { Client } = require("discord.js");

const defaultOptions = {
    commandsDirectory: "commands",
    eventsDirectory: "events",
    embedsDirectory: "embeds",
    tasksDirectory: "tasks",

    loggerFormatter: (messages, context) =>
        messages.unshift(`[${new Date().toUTCString()}] [${context.level.name}]: `)
};

class SherBotClient {

    /**
     * Creates a new SherBotClient.
     * 
     * @param {ClientOptions} [clientOptions] Options for the regular Discord client.
     * @param {SherBotOptions} [options] Options to be used for SherBot.
     * 
     */
    constructor(clientOptions = {}, options = defaultOptions) {
        this.client = new Client(clientOptions);
        this.options = options;
        this.logger = require("js-logger");
        this.logger.useDefaults({
            defaultLevel: this.logger.DEBUG,
            formatter: options.loggerFormatter
        });

        Object.defineProperty(this, "token", { writable: true });
        if (!browser && !this.token && "DISCORD_TOKEN" in process.env) {
            /**
             * Authorization token for the logged in bot.
             * If present, this defaults to `process.env.DISCORD_TOKEN` when instantiating the client
             * <warn>This should be kept private at all times.</warn>
             * @type {?string}
             */
            this.token = process.env.DISCORD_TOKEN;

        } else
            this.token = null;
    }

    /**
     * Logs the client in, establishing a websocket connection to Discord.
     * 
     * @param {string} [token=this.token] Token of the account to log in with
     * @returns {Promise<string>} Token of the account used
     * @example client.login('my token');
     * 
     */
    async login(token = this.token) {
        this.client.once("ready", () => {
            setPresence();
            registerCommands();
            registerEvents();
            registerTasks();
            handleCommands();

            logger.info("Bot loaded!");
        });

        return this.client.login(token);
    }

    /**
     * Sets the initial Discord bot user presence text. 
     * 
     * @private
     * 
     */
    #setPresence() {
        logger.info("Setting presence!");
        discord.user.setPresence({
            status: "dnd",
            activity: {
                name: "Loading bot...",
                type: "WATCHING",
                url: null
            },

            type: "WATCHING"
        });
    }

    /**
     * Load all command files from the "commands" folder, and POST them to the Discord 
     * command endpoint for the specific server.
     * 
     * @private
     * 
     */
    #registerCommands() {
        logger.info("Loading commands!");
        let files = fs.readdirSync(`./${this.options.commandsDirectory}`)
            .filter(file => file.endsWith(".js") && file != "example.command.js");

        for (const file of files) {
            const command = require(`./${this.options.commandsDirectory}/${file}`);
            if (!command.enabled)
                continue;

            commands.push(command);
            discord.api.applications(discord.user.id).guilds(config.server).commands.post(command);
            logger.info(`Loaded command from file: commands/${file}`);
        }
    }

    /**
     * Load all event handler files from the "events" folder, and registers them 
     * with the Discord event manager.
     * 
     * @private
     * 
     */
    #registerEvents() {
        logger.info("Loading event handlers!");
        let files = fs.readdirSync(`./${this.options.eventsDirectory}`)
            .filter(file => file.endsWith(".js") && file != "example.event.js");

        for (const file of files) {
            const event = require(`./${this.options.eventsDirectory}/${file}`);
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
     * Load all repeating task files from the "tasks" folder, and registers them 
     * with the JS Window DOM.
     * 
     * @private
     * 
     */
    #registerTasks() {
        logger.info("Loading tasks!");
        let files = fs.readdirSync(`./${this.options.tasksDirectory}`)
            .filter(file => file.endsWith(".js") && file != "example.task.js");

        for (const file of files) {
            const task = require(`./${this.options.tasksDirectory}/${file}`);
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
     * @private
     * 
     */
    #handleCommands() {
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

}

module.exports = SherBotClient;